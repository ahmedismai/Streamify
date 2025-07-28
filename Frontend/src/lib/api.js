
import { toast } from 'react-hot-toast';
import { axiosInstance } from './axios.js';

export const Register = async (signupData)=>{
        const response = await axiosInstance.post("/auth/signup", signupData)
        return response.data
}
export const loginResponse = async (loginData)=>{
        const response = await axiosInstance.post("/auth/login", loginData)
        return response.data
}
export const sendPasswordResetEmail  = async (loginData)=>{
        try {
                const response = await axiosInstance.post("/auth/forgot-password", loginData)
                toast.success("Reset link sent! Check your inbox.");
                return response.data
        } catch (error) {
                console.error("forgot error:", error.response?.data || error.message);
                toast.error("con't send a message in your email please try again")
                throw error; 
        }
}
export async function resetPasswordRequest({ password, token }) {
        try {
            const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
            toast.success("Password reset successful! Redirecting to login...");
            return response.data;
        } catch (error) {
            console.error("Reset error:", error.response?.data || error.message);
            toast.error("con't reset your password please try again")
            throw error; 
        }
}    
export const logout = async ()=>{
        const response = await axiosInstance.post("/auth/logout")
        return response.data
}
export const getAuthUser = async ()=>{
        try {
                const res =await axiosInstance.get("/auth/myProfile")
                return res.data
        } catch (error) {
                console.log("Error in getAuthUser", error)
                return null
        }
}
export const completeOnboarding = async (userData)=>{
        const res =await axiosInstance.post("/auth/onboarding", userData)
        return res.data
}
export const getUserFriends = async ()=>{
        const res =await axiosInstance.get("/users/friends")
        return res.data
}
export const getRecommendedUsers = async ()=>{
        const res =await axiosInstance.get("/users")
        return res.data
}
export const getOutGoingFriendReqs = async ()=>{
        const res =await axiosInstance.get("/users/outgoing-friend-requests")
        return res.data
}
export const sendFriendRequest = async (userId)=>{
        const res =await axiosInstance.post(`/users/friend-request/${userId}`)
        return res.data
}
export const acceptFriendRequest = async (requestId)=>{
        const res =await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
        return res.data
}
export const getFriendRequest = async ()=>{
        const res =await axiosInstance.get(`/users/friend-request`)
        return res.data
}

export const getStreamToken = async ()=>{
        const res =await axiosInstance.get(`/chat/token`)
        return res.data
}
