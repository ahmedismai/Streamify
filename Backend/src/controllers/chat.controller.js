import { generateStreamToken, getStreamApiKey } from "../lib/stream.js";

export function getStreamTokenResponse(userId) {
    return {
        token: generateStreamToken(userId),
        apiKey: getStreamApiKey(),
    };
}


export async function getStreamToken(req, res){
    try {
        res.status(200).json(getStreamTokenResponse(req.user.id))
    } catch (error) {
        console.error("getStreamToken error:", error);
        res.status(500).json("Server error. Please try again later.")
    }
}
