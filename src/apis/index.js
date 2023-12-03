import { axiosInstance } from "./core";

const getMainProductList = async () => {
  const res = await axiosInstance.get("/api/product");
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

const postLikedProduct = async (id) => {
  const res = await axiosInstance.post(`/api/product/like`, {
    prod_idx: id,
  });
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

// logout
const getUserLogout = async () => {
  const res = await axiosInstance.get("/api/user/logout");
  return res.data;
};

// my post CUD
const postMyProduct = async (productData) => {
  const res = await axiosInstance.post("/api/product", productData);
  return res;
};

const deleteMyPost = async (prod_idx) => {
  const res = await axiosInstance.delete(`/api/product?prod_idx=${prod_idx}`);
  return res;
};

const patchMyPost = async (patchedData) => {
  const res = await axiosInstance.patch("/api/product", patchedData);
  return res;
};

// post sale-complete
const postSaleComplete = async (prod_idx, socket) => {
  const res = await axiosInstance.post(`/api/product/sale-complete`, {
    prod_idx,
    socket,
  });
  return res.data;
};

export const Api = {
  getMainProductList,
  getDetailProduct,
  getUsedOrFreeProduct,
  getSearchProduct,
  getFreeProduct,
  getBuyerChatData,
  postMyChatData,
  getProductPrice,
  postMyProduct,
  postLikedProduct,
  getUserLogout,
  postSaleComplete,
  deleteMyPost,
  patchMyPost,
};
