import { Router } from "express";
const route = Router();
import { handleLogin ,handleLogout, handleSignup  ,handleDashboard , handleDetails} 
from "../controllers/userControllers.js";
import { checkAuth } from "../middleware/userMiddlewares.js";

route
.get("/logout" , handleLogout)
.post("/login" , handleLogin)
.post("/signup" , handleSignup)
.get("/dashboard" , checkAuth , handleDashboard)
.get("/details" , checkAuth , handleDetails)

export default route;
