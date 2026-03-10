import axios from "axios";

const localApiUrl = "http://localhost:5000/api";
const productionApiUrl = "https://assignment-backend-l58f.onrender.com/api";

function getApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  return isLocalHost ? localApiUrl : productionApiUrl;
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  timeout: 5000,
});

export default api;
