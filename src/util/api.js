import axios from "axios";
// const url  ="http://192.168.0.101:8080"

// Create an Axios instance
const api = axios.create();

// Request interceptor to add the JWT token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
