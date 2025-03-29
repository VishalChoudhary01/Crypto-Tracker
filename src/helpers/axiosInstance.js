import axios from "axios";
import { COINGECKO_API_URL } from "./constants";

// configuration of axios instances using create method with baseUrl key and url as value from constants file
const axiosInstance = axios.create({
  baseURL: COINGECKO_API_URL,
});

export default axiosInstance;
