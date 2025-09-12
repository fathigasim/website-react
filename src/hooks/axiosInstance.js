// import axios from "axios";
// import { navigateTo } from "../Hepler/navigationHelper";


// const axiosInstance = axios.create({
//   baseURL: "https://localhost:7228",
// });

// // Attach token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRedirecting = false;

// // Handle responses
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401 && !isRedirecting) {
//         console.log("Unauthorized. Redirecting to login.");
//         localStorage.removeItem("token");
//         isRedirecting = true;
//         navigateTo("/login");
//       } else if (error.response.status === 403) {
//         navigateTo("/forbidden");
//       }
//       else if(error.response.status===404){
//         console.log(error.response.message)
//       }
//       else if (error.response.status === 500) {
//         console.error("Server error. Please try again later.");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7228",
});

// Attach token
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

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (error.response?.status === 401) {
       // Trigger forced logout
      const event = new CustomEvent("logout", { detail: { forced: true } });
      window.dispatchEvent(event);
      // console.log("⛔ Unauthorized → force logout");

      // localStorage.removeItem("token");
      // // Preserve current path
      // const currentPath = encodeURIComponent(
      //   window.location.pathname + window.location.search
      // );

      // // Redirect with ?redirect=
      // window.location.href = `/login?redirect=${currentPath}`;
      // window.dispatchEvent(new Event("force-logout")); // 🔥 trigger logout globally
    }
   
      else if (status === 403) {
        window.location.href = "/forbidden";
      } 
      else if (status === 404) {
        console.warn("Resource not found:", error.response?.data?.message);
      } 
      else if (status === 500) {
        console.error("💥 Server error. Please try again later.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

