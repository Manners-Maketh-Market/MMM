import axios from "axios";
import TokenRepository from "../repository/token-repository";
import AuthApi from "./auth";

export const axiosInstance = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      // token 종류 (JWT) => Bearer
      Authorization: `Bearer ${TokenRepository.getToken()}`,
    },
    // 백엔드에서 refresh token을 cookie 형태로 전달
    withCredentials: true,
  });
};
// Kakao API
export const axiosKakaoInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `KakaoAK ${TokenRepository.getToken()}`,
  },
  withCredentials: true,
});

axiosInstance().interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 세션 만료
    if (error.response.status === 403) {
      await AuthApi.signOut();
      TokenRepository.deleteToken();
      alert("세션이 만료되었습니다.");
      window.location.href = "/";
    }
  }
);
