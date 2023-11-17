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

const getSearchProduct = async (category, keyword, pageParam) => {
  const res = await axiosInstance.get(
    `/api/product/search?category=${category}&keyword=${keyword}&page=${pageParam}`
  );
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

const postRegistData = async (registData) => {
  const res = await axiosInstance.post("/register", registData);
  return res;
};

const getsignUserData = async () => {
  const res = await axiosInstance.get("/signup");
  return res;
};

export const Api = {
  getMainProductList,
  getDetailProduct,
  getUsedOrFreeProduct,
  getUsedProduct,
  getSearchProduct,
  getFreeProduct,
  getBuyerChatData,
  postMyChatData,
  getUserData,
  getProductPrice,
  postUserData,
  getsignUserData,
  postRegistData,
};
