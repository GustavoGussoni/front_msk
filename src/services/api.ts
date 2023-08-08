import axios from "axios";

const api = axios.create({
  baseURL: "https://deploy-music-app.onrender.com",
  timeout: 10000
});

export default api;
