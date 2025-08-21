import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5002/api" 
    : "https://olivechat-realtimechatapp.onrender.com/api",
  withCredentials: true,
});
