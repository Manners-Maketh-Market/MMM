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

const getMyPageLikeProduct = async (pageParam) => {
  const res = await axiosInstance.get(
    `/api/user/my-page/like-product-list?page=${pageParam}`
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

// get user info.
const getUserData = async () => {
  const res = await axiosInstance.get("/api/user/info");
  return res.data;
};

// get my-page info.
const getMyPageData = async () => {
  const res = await axiosInstance.get("/api/user/my-page");
  return res.data;
};

// patch user info.
const patchUserData = async (myCurrentInfo) => {
  const res = await axiosInstance.patch("/api/user", myCurrentInfo);
  return res.data;
};
const patchUserProfile = async (uploadedImage) => {
  const res = await axiosInstance.patch("/api/user/profile", uploadedImage);
  return res.data;
};
const patchUserPassword = async (newPassword) => {
  const res = await axiosInstance.patch("/api/user/password", newPassword);
  return res.data;
};

// logout
const getUserLogout = async () => {
  const res = await axiosInstance.get("/api/user/logout");
  return res.data;
};

// duplicate check(email)
const getCheckEmail = async (email) => {
  const res = await axiosInstance.get(`/api/user/check/email?email=${email}`);
  return res;
};

// duplicate check(nickName)
const getCheckNickName = async (nickName) => {
  const res = await axiosInstance.get(
    `/api/user/check/nickname?nickname=${nickName}`
  );
  return res;
};

const postMyProduct = async (productData) => {
  const res = await axiosInstance.post("/api/product", productData);
  return res;
};

// get my products list
const getMyProductList = async (page, category) => {
  const res = await axiosInstance.get(
    `/api/user/my-page/product-list?page=${page}&category=${category}`
  );
  return res.data;
};

// get my interested products list
const getInterestedProductList = async (page) => {
  const res = await axiosInstance.get(
    `/api/user/my-page/like-product-list?page=${page}`
  );
  return res.data;
};

const getMyHousekeepingBook = async (page, category, start, end) => {
  const res = await axiosInstance.get(
    `/api/user/my-page/account-book?page=${page}&category=${category}&start=${start}&end=${end}`
  );
  return res;
};

export const Api = {
  getMainProductList,
  getDetailProduct,
  getUsedOrFreeProduct,
  getSearchProduct,
  getFreeProduct,
  getBuyerChatData,
  postMyChatData,
  getUserData,
  getProductPrice,
  postMyProduct,
  postSignUpData,
  postLoginUserData,
  getCheckEmail,
  getCheckNickName,
  postLikedProduct,
  getMyPageLikeProduct,
  postSignUpData,
  postLoginUserData,
  getCheckEmail,
  getCheckNickName,
  getMyPageData,
  patchUserData,
  getUserLogout,
  patchUserProfile,
  patchUserPassword,
  getMyProductList,
  getInterestedProductList,
  getMyHousekeepingBook,
};
