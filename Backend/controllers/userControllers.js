import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.js";
import { loginBody, signupBody  } from "../utils/zod.js";

export const handleLogin = async (req ,res) => {
  const {username , password} = req.body;
  const { success } = loginBody.safeParse(req.body); 
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User Doesn't exist !!!!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error("Wrong Password!!!!");
    }
   
   const token = createToken(user._id);

   res.cookie("jwtToken", token , {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in production to ensure HTTPS
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
   })

   res.status(201).send({
    success: true, 
    message: "Logged In Successfully !!!",
    token : token,
    user: {
      ...user._doc,
      password: undefined,
    }
  });

} catch (error) {
  res.status(200).send({ success: false, message: error.message });
}

}

export const handleSignup = async (req ,res) => {
  const { firstName, lastName, username, password , role } = req.body;

  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }


  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({
        message: "User Already Exist !!! Please Login ..."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
    });

    if (!user) {
      throw new Error("Failed To Create New User!");
    }

    const token = createToken(user._id);

   res.cookie("jwtToken", token , {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
   })

    res.json({
      success: true,
      token : token,
      user: {
        ...user._doc,
        password: undefined,
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const handleLogout = (req, res) => {
  
  res.json({ success: true, message: "Logged Out Successfully!" });
};


export const handleDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      role: user.role, 
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const handleDetails = async (req , res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      firstName: user.firstName,
      lastName : user.lastName, 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
