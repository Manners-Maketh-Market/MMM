import { axiosInstance } from "./core";

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

const postUserData = async (signupData) => {
  const res = await axiosInstance.post("/signup", signupData);
  return res;
};

export const Api = {
  getUsedOrFreeProduct,
  getUsedProduct,
  getSearchProduct,
  getFreeProduct,
  getBuyerChatData,
  postMyChatData,
  getUserData,
  postUserData,
};
