import axios from "axios";

const api = axios.create({
  baseURL: `https://www.chukky.tech/api/v1`,
});

export default api;
