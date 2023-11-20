import { axiosInstance } from "./core";

const getMainProductList = async () => {
  const res = await axiosInstance.get(`/api/product`);
  return res.data;
};

const getDetailProduct = async (param) => {
  const res = await axiosInstance.get(`/api/product/detail?prod_idx=${param}`);
  return res.data;
};

const getUsedOrFreeProduct = async (pageParam, saleStatus) => {
  const res = await axiosInstance.get(
    `/api/product/search?category=${saleStatus}&page=${pageParam}`
  );
  return res.data;
};

const getProductPrice = async (keyword, start, end) => {
  const res = await axiosInstance.get(
    `/api/product/quote?keyword=${keyword}&start=${start}&end=${end}`
  );
  return res.data;
};

const getSearchProduct = async (category, keyword, pageParam) => {
  const res = await axiosInstance.get(
    `/api/product/search?category=${category}&keyword=${keyword}&page=${pageParam}`
  );
  return res.data;
};

const getBuyerChatData = async () => {
  const res = await axiosInstance.get("/chat/buyer");
  return res.data;
};

const postMyChatData = async (bodyData) => {
  const res = await axiosInstance.post("/chat/buyer", bodyData);
  return res;
};

// get user info.
const getUserData = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};

// sign-up
const postSignUpData = async (signupData) => {
  const res = await axiosInstance.post("/api/user", signupData);
  return res;
};

// sign-in
const postLoginUserData = async (loginUserData) => {
  const res = await axiosInstance.post("/api/user/login", loginUserData);
  return res;
};
// logout

// 이메일 중복 체크
const getCheckEmail = async (email) => {
  const res = await axiosInstance.get(`/api/user/check/email?email=${email}`);
  return res;
};

// 닉네임 중복 체크
const getCheckNickName = async (nickName) => {
  const res = await axiosInstance.get(
    `/api/user/check/nickname?nickname=${nickName}`
  );
  return res;
};

const postRegistData = async (registData) => {
  const res = await axiosInstance.post("/register", registData);
  return res;
};

export const Api = {
  getMainProductList,
  getDetailProduct,
  getUsedOrFreeProduct,
  getSearchProduct,
  getBuyerChatData,
  postMyChatData,
  getUserData,
  getProductPrice,
  postRegistData,
  postSignUpData,
  postLoginUserData,
  getCheckEmail,
  getCheckNickName,
};
