import axios from "axios";

const api = axios.create({
  baseURL: `https://www.epicsprint.tech/api/v1/`,
});

export default api;
