import axios from "axios";
import TokenRepository from "../repository/token-repository";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // token 종류 (JWT) => Bearer
    Authorization: `Bearer ${TokenRepository.getToken()}`,
  },
  withCredentials: true,
});

// Kakao API
export const axiosKakaoInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `KakaoAK ${TokenRepository.getToken()}`,
  },
  withCredentials: true,
});
