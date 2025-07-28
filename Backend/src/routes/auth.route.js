import {Router} from "express";
import { forgotPassword, login, logout, myProfile, onboard, resetPassword, signup } from "../controllers/auth.controller.js";

import { protectedRoute } from '../middleware/auth.middleware.js';

const router = Router()

router.post("/signup" ,signup)
router.post("/login" ,login)
router.post("/logout",logout )
router.post("/onboarding" , protectedRoute ,onboard)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/myProfile" , protectedRoute , myProfile)


export default router