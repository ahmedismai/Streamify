

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080":"https://streamify-production-27b0.up.railway.app"
export const axiosInstance = axios.create({
baseURL: BASE_URL,
withCredentials:true
})
