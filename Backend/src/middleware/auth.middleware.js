import jwt  from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req , res , next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided "})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({message:"Unauthorized - In-valid token"})
        }
        const user = await User.findOne({_id: decoded.userId}).select("-password")
        if (!user) {
            return res.status(401).json({message:"Unauthorized - user not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error("Error in protectedRoute middleware :", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}