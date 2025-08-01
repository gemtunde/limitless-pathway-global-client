import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `📤 Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
      );
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `✅ Response: ${response.status} from ${response.config.url}`
      );
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("🔴 API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
        url: error.config?.url,
        method: error.config?.method,
      });
    } else if (error.request) {
      console.error("🟠 Network Error (no response):", {
        message: error.message,
        url: error.config?.url,
      });
    } else {
      console.error("⚠️ Unknown Error:", {
        message: error.message,
      });
    }

    // For deep debugging
    console.error("🧵 Raw Error Object:", error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
