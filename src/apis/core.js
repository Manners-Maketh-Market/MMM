import axios from "axios";

// 데이터 받아오게되면 baseURL 변경예정
export const axiosInstance = axios.create({
  baseURL: "api",
});
