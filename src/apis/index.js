import { axiosInstance } from "./core";

const getAllProduct = async () => {
  const res = await axiosInstance.get(`/api/product`);
  return res.data;
};

const getUsedOrFreeProduct = async (param) => {
  const res = await axiosInstance.get(`/products/${param}`);
  return res.data;
};

const getSearchProduct = async (param) => {
  const res = await axiosInstance.get(`/products/search/${param}`);
  return res.data;
};

const getUsedProduct = async () => {
  const res = await axiosInstance.get("/products/sell");
  return res.data;
};

const getFreeProduct = async () => {
  const res = await axiosInstance.get("/products/free");
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

// register my product
const postRegistData = async (registData) => {
  const res = await axiosInstance.post("/register", registData);
  return res;
};

export const Api = {
  getAllProduct,
  getUsedOrFreeProduct,
  getUsedProduct,
  getSearchProduct,
  getFreeProduct,
  getBuyerChatData,
  postMyChatData,
  getUserData,
  postSignUpData,
  postLoginUserData,
  postRegistData,
};
