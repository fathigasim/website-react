import axios from "axios";
import { navigateTo } from "../Hepler/navigationHelper";
import { resolvePath } from "react-router";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7228",
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirecting = false;

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && !isRedirecting) {
        console.log("Unauthorized. Redirecting to login.");
        localStorage.removeItem("token");
        isRedirecting = true;
        navigateTo("/login");
      } else if (error.response.status === 403) {
        navigateTo("/forbidden");
      }
      else if(error.response.status===404){
        console.log(error.response.message)
      }
      else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
