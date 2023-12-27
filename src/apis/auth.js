import { axiosInstance } from "./core";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// export const setCookie = (name, value, option) => {
//   return cookies.set(name, value, { option });
// };
// export const getCookie = (name) => {
//   return cookies.get(name);
// };
// export const removeCookie = (name) => {
//   return cookies.remove(name);
// };

const PATH = "/api/user";
const AuthApi = {
  // User - account

  // sign-up
  async postSignUpData(signupData) {
    const res = await axiosInstance.post(PATH, signupData);
    return res;
  },
  // sign-in
  async postLoginUserData(loginUserData) {
    const res = await axiosInstance.post("/api/user/login", loginUserData);
    return res.data;
  },
  // get user info.
  async getUserData() {
    const res = await axiosInstance.get(`${PATH}/info`);
    return res.data;
  },
  // get my-page info.
  async getMyPageData() {
    const res = await axiosInstance.get(`${PATH}/my-page`);
    return res.data;
  },
  // patch user info.
  async patchUserData(myCurrentInfo) {
    const res = await axiosInstance.patch(PATH, myCurrentInfo);
    return res.data;
  },
  async patchUserProfile(uploadedImage) {
    const res = await axiosInstance.patch(`${PATH}/profile`, uploadedImage);
    return res.data;
  },
  async patchUserPassword(newPassword) {
    const res = await axiosInstance.patch(`${PATH}/password`, newPassword);
    return res.data;
  },
  // logout
  async getUserLogout() {
    const res = await axiosInstance.get(`${PATH}/logout`);
    // removeCookie("myToken");
    return res.data;
  },
  // duplicate check(email)
  async getCheckEmail(email) {
    const res = await axiosInstance.get(`${PATH}/check/email?email=${email}`);
    return res.data;
  },
  // duplicate check(nickName)
  async getCheckNickName(nickName) {
    const res = await axiosInstance.get(
      `${PATH}/check/nickname?nickname=${nickName}`
    );
    return res.data;
  },
  // refresh token
  /* 
    accessToken expired 417 (재발급 필요)
    refreshToken expired 403 (세션 만료)
  */
  async getRefreshToken() {
    const res = await axiosInstance.get(`${PATH}/refreshToken`);
    return res;
  },

  // User - Product
  // get my liked product
  async getMyPageLikeProduct(pageParam) {
    const res = await axiosInstance.get(
      `${PATH}/my-page/like-product-list?page=${pageParam}`
    );
    return res.data;
  },
  // get my products list
  async getMyProductList(page, category) {
    const res = await axiosInstance.get(
      `${PATH}/my-page/product-list?page=${page}&category=${category}`
    );
    return res.data;
  },
  // get my interested products list
  async getInterestedProductList(page) {
    const res = await axiosInstance.get(
      `${PATH}/my-page/like-product-list?page=${page}`
    );
    return res.data;
  },
  // get my account book
  async getMyHousekeepingBook(pageParam, category, start, end) {
    const res = await axiosInstance.get(
      `${PATH}/my-page/account-book?page=${pageParam}&category=${category}&start=${start}&end=${end}`
    );
    return res;
  },
};

export default AuthApi;
