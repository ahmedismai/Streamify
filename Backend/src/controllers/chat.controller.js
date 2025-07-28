import { generateStreamToken } from "../lib/stream.js";


export async function getStreamToken(req, res){
    try {
        const token = generateStreamToken(req.user.id)
        res.status(200).json({token})
    } catch (error) {
        console.error("getStreamToken error:", error);
        res.status(500).json("Server error. Please try again later.")
    }
}