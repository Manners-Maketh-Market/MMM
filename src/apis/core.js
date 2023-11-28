import axios from "axios";
import TokenRepository from "../repository/token-repository";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // token 종류 명시 필수 (json web token(JWT) => Bearer)
    Authorization: `Bearer ${TokenRepository.getToken()}`,
    // kakao map app-key
  },
  withCredentials: true,
});

// Authorization 내용이 겹쳐서 403에러로 인해 2개로 나눴습니다.
export const axiosKakaoInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // kakao map app-key
    Authorization: `KakaoAK ${TokenRepository.getToken()}`,
  },
  withCredentials: true,
});
