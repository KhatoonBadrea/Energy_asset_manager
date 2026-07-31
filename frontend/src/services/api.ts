import axios from "axios";

// This is the single Axios instance used by the entire application.
// Every request to the Laravel backend goes through this instance,
// so authentication headers and error handling stay in one place.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: runs before every single request leaves the app.
// It reads the saved token (if any) and attaches it as a Bearer token,
// so we never have to manually add it in each service function.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: runs after every response comes back.
// If the backend says 401 (token invalid or expired), we clear the
// stored token and redirect to the login page automatically.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
