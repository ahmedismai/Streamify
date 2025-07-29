import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import * as crypto from 'node:crypto';
import { sendEmail } from "../utils/sendEmail.js";


export async function signup(req, res){
    const {email , password , fullName}= req.body
    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already exist, please use a deferent one"})
        }
        
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`

        
            const newUser = await User.create({
                email,
                password,
                name:fullName,
                profilePic:randomAvatar,
            })
            
        
        try {
            await upsertStreamUser({
                id:newUser._id,
                name:newUser.name,
                image:newUser.profilePic || "" 
            })
            console.log(`Steam user created for ${newUser.name}`)
        } catch (error) {
            console.error(`Error creating stream user`, error)
            
        }

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        res.cookie("jwt",token , {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite:"none",
            // sameSite:"strict",
            secure:process.env.NODE_ENV === "production"
        })
        res.status(201).json({success:true , user:newUser})
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function login(req, res){
    const {email , password }= req.body
    try {
        if(!email || !password ){
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"In-valid email or password "})
        }
        
        const isPasswordCorrect = await user.matchPassword(password) 
        if(!isPasswordCorrect){
            return res.status(401).json({message:"In-valid email or password "})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"
        })
        res.cookie("jwt",token , {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // sameSite:"strict",
            sameSite:"none",
            secure:process.env.NODE_ENV === "production"
        })
        res.status(200).json({success:true , user})
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export async function logout(req, res){
    res.clearCookie("jwt");
    res.status(200).json({success:true , message:"Logout successful"})
}

export async function onboard(req,res){
    try {
        const userId = req.user._id
        const {fullName , bio , nativeLanguage , learningLanguage,location} = req.body
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({message:"All fields are required", missingFields:[
                !fullName && "fullName",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !location && "location"
            ].filter(Boolean)
        })
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            // ...req.body,
            name: fullName,
            bio,
            nativeLanguage,
            learningLanguage,
            location,
            isOnBoarded: true
        },{new:true})

        if (!updatedUser) {
            return res.status(404).json({message:"User not found "})
        }

        try {
            await upsertStreamUser({
                id:updatedUser._id.toString(),
                name:updatedUser.name,
                image:updatedUser.profilePic || "",

            })
            console.log(`Stream user updated after onboarding for ${updatedUser.name}`);
        } catch (error) {
            console.error(`Error updating user during onboarding: `, error.message);
        }

        return res.status(200).json({success:true , user: updatedUser})
    } catch (error) {
        console.error("Onboarding error" ,  error)
        res.status(500).json("Server error. Please try again later.")
    }
}

export async function myProfile(req, res){
        res.status(200).json({success:true , user: req.user})
}

export async function forgotPassword(req, res){
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = user.generateResetToken();
                await user.save();
                const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
                const message = `
                <p>You requested a password reset.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetURL}" target="_blank">${resetURL}</a>
                <p>This link will expire in 10 minutes.</p>
            `;
            
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                html: message,
            });
        res.status(200).json({ success: true, message: "Reset link sent", resetURL });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json("Server error. Please try again later.")
    }
};

export async function resetPassword(req, res){
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    try {
        const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json("Server error. Please try again later.")
    }
};

