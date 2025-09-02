import axios from "axios";

const BASE_URL = "https://streamify-4ov3.vercel.app";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
