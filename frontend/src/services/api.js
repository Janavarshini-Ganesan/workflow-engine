import axios from "axios";

const API = axios.create({
  baseURL: "https://workflow-backend-bblv.onrender.com"
});

export default API;