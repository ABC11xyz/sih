import dotenv from 'dotenv';
import express from 'express';
import connectDB from './DB/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json()); 


app.use(cors());

app.use("/api/auth/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at - http://localhost:5000`);
    connectDB();
});
