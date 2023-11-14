import axios from "axios";
import TokenRepository from "repository/TokenRepository";
import AuthApi from "./auth";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // token 종류 명시 필수 (json web token(JWT) => Bearer)
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    // kakao map app-key
  },
  withCredentials: true,
});

// Authorization 내용이 겹쳐서 403에러로 인해 2개로 나눴습니다.
export const axiosKakaoInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    // kakao map app-key
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_TOKEN}`,
  },
  withCredentials: true,
});

/* 

// axios.interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = TokenRepository.getToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// refresh token으로 access token 재발급 받기
axiosInstance.interceptors.response.use(
  // success
  (response) => {
    return response;
  },
  // fail
  async (error) => {
    const originRequest = error.config;

    // unAuthorize error (401)
    if (error.response.status === 401 && !originRequest._retry) {
      originRequest._retry = true;
      const response = await AuthApi.refresh();
      const token = response.data;
      axiosInstance.setToken(token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return axiosInstance(error.config);
    }
    // session 만료 (404)
    if (error.response.status === 404) {
      await AuthApi.signOut();
      TokenRepository.deleteToken();
      alert("세션이 만료되었습니다, 다시 로그인해주세요");
      window.location.href = "/";
    }
    // other errors
    return Promise.reject(error);
  }
);

*/
