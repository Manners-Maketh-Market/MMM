import { axiosInstance } from "./core";

// 중고거래, 무료나눔 텍스트 클릭시에 이동되는 페이지에서 사용하는 데이터입니다.

const getAllProduct = async () => {
  const res = await axiosInstance.get(`/products`);
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

const getUserData = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};

// styled-component의 const S같은 기능 (번들링 사이즈가 줄어든다!)
export const Api = {
  getAllProduct,
  getUsedOrFreeProduct,
  getUsedProduct,
  getSearchProduct,
  getFreeProduct,
  getUserData,
};
