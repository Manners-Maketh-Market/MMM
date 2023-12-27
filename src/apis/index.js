import { axiosInstance } from "./core";

const PATH = "/api/product";

const getMainProductList = async () => {
  const res = await axiosInstance.get(PATH);
  return res.data;
};

const getDetailProduct = async (param) => {
  const res = await axiosInstance.get(PATH + `/detail?prod_idx=${param}`);
  return res.data;
};

const getUsedOrFreeProduct = async (pageParam, saleStatus) => {
  const res = await axiosInstance.get(
    PATH + `/search?category=${saleStatus}&page=${pageParam}`
  );
  return res.data;
};

const getProductPrice = async (keyword, start, end) => {
  const res = await axiosInstance.get(
    PATH + `/quote?keyword=${keyword}&start=${start}&end=${end}`
  );
  return res.data;
};

const getSearchProduct = async (category, keyword, pageParam) => {
  const res = await axiosInstance.get(
    PATH + `/search?category=${category}&keyword=${keyword}&page=${pageParam}`
  );
  return res.data;
};

const postLikedProduct = async (id) => {
  const res = await axiosInstance.post(PATH + `/like`, {
    prod_idx: id,
  });
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

// my post CUD
const postMyProduct = async (productData) => {
  const res = await axiosInstance.post(PATH, productData);
  return res;
};

const deleteMyPost = async (prod_idx) => {
  const res = await axiosInstance.delete(PATH + `?prod_idx=${prod_idx}`);
  return res;
};

const patchMyPost = async (patchedData) => {
  const res = await axiosInstance.patch(PATH, patchedData);
  return res;
};

// post sale-complete
const postSaleComplete = async (requestData) => {
  const res = await axiosInstance.post(PATH + "/sale-complete", requestData);
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
  postSaleComplete,
  deleteMyPost,
  patchMyPost,
};
