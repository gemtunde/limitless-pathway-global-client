import axios from "axios";

// Create a simple axios instance without authentication
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://limitless-pathway-global-server.onrender.com/api",
  timeout: 30000, // 30 seconds timeout (Render can be slower on cold starts)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Simple request interceptor (optional - for logging or other purposes)
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Making ${config.method?.toUpperCase()} request to: ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Simple response interceptor (optional - for logging or error handling)
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(`Response from ${response.config.url}:`, response.status);
    }
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", {
        status: error.response.status,
        message: error.response.data?.message || error.message,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
