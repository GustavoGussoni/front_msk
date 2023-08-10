import axios from "axios";

const api = axios.create({
  baseURL: "https://deploy-music-app.onrender.com"
});

export default api;
