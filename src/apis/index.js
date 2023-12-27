import { axiosInstance } from "./core";

const getMainProductList = async () => {
  const res = await axiosInstance().get("/api/product");
  return res.data;
};

const getDetailProduct = async (param) => {
  const res = await axiosInstance().get(
    `/api/product/detail?prod_idx=${param}`
  );
  return res.data;
};

const getUsedOrFreeProduct = async (pageParam, saleStatus) => {
  const res = await axiosInstance().get(
    `/api/product/search?category=${saleStatus}&page=${pageParam}`
  );
  return res.data;
};

const getProductPrice = async (keyword, start, end) => {
  const res = await axiosInstance().get(
    `/api/product/quote?keyword=${keyword}&start=${start}&end=${end}`
  );
  return res.data;
};

const getSearchProduct = async (category, keyword, pageParam) => {
  const res = await axiosInstance().get(
    `/api/product/search?category=${category}&keyword=${keyword}&page=${pageParam}`
  );
  return res.data;
};

const postLikedProduct = async (id) => {
  const res = await axiosInstance().post(`/api/product/like`, {
    prod_idx: id,
  });
  return res.data;
};

const getMyPageLikeProduct = async (pageParam) => {
  const res = await axiosInstance().get(
    `/api/user/my-page/like-product-list?page=${pageParam}`
  );
  return res.data;
};

const getUsedProduct = async () => {
  const res = await axiosInstance().get("/products/sell");
  return res.data;
};

const getFreeProduct = async () => {
  const res = await axiosInstance().get("/products/free");
  return res.data;
};

// sign-up
const postSignUpData = async (signupData) => {
  const res = await axiosInstance().post("/api/user", signupData);
  return res;
};

// sign-in
const postLoginUserData = async (loginUserData) => {
  const res = await axiosInstance().post("/api/user/login", loginUserData);
  return res.data;
};

// get user info.
const getUserData = async () => {
  const res = await axiosInstance().get("/api/user/info");
  return res.data;
};

// get my-page info.
const getMyPageData = async () => {
  const res = await axiosInstance().get("/api/user/my-page");
  return res.data;
};

// patch user info.
const patchUserData = async (myCurrentInfo) => {
  const res = await axiosInstance().patch("/api/user", myCurrentInfo);
  return res.data;
};
const patchUserProfile = async (uploadedImage) => {
  const res = await axiosInstance().patch("/api/user/profile", uploadedImage);
  return res.data;
};
const patchUserPassword = async (newPassword) => {
  const res = await axiosInstance().patch("/api/user/password", newPassword);
  return res.data;
};

// logout
const getUserLogout = async () => {
  const res = await axiosInstance().get("/api/user/logout");
  return res.data;
};

// duplicate check(email)
const getCheckEmail = async (email) => {
  const res = await axiosInstance().get(`/api/user/check/email?email=${email}`);
  return res;
};

// duplicate check(nickName)
const getCheckNickName = async (nickName) => {
  const res = await axiosInstance().get(
    `/api/user/check/nickname?nickname=${nickName}`
  );
  return res;
};

// my post CUD
const postMyProduct = async (productData) => {
  const res = await axiosInstance().post("/api/product", productData);
  return res;
};

const deleteMyPost = async (prod_idx) => {
  const res = await axiosInstance().delete(`/api/product?prod_idx=${prod_idx}`);
  return res;
};

const patchMyPost = async (patchedData) => {
  const res = await axiosInstance().patch("/api/product", patchedData);
  return res;
};

// get my products list
const getMyProductList = async (page, category) => {
  const res = await axiosInstance().get(
    `/api/user/my-page/product-list?page=${page}&category=${category}`
  );
  return res.data;
};

// get my interested products list
const getInterestedProductList = async (page) => {
  const res = await axiosInstance().get(
    `/api/user/my-page/like-product-list?page=${page}`
  );
  return res.data;
};

const getMyHousekeepingBook = async (pageParam, category, start, end) => {
  const res = await axiosInstance().get(
    `/api/user/my-page/account-book?page=${pageParam}&category=${category}&start=${start}&end=${end}`
  );
  return res;
};

// post sale-complete
const postSaleComplete = async (idx) => {
  const res = await axiosInstance().post(`/api/product/sale-complete`, {
    prod_idx: idx,
  });
  return res.data;
};

export const Api = {
  getMainProductList,
  getDetailProduct,
  getUsedOrFreeProduct,
  getSearchProduct,
  getFreeProduct,
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
  postSaleComplete,
  deleteMyPost,
  patchMyPost,
};

// 채팅방 생성 post 함수
const postCreateChatRoom = async (idx) => {
  const res = await axiosInstance().post(`/api/chat`, {
    prod_idx: idx,
  });
  return res.data;
};

// 채팅방 저장 함수
const postSaveChatRoom = async (data) => {
  const res = await axiosInstance().post(`/api/chat/send`, data);
  return res.data;
};

// 채팅방 로그 조회 함수
const getChatLog = async (room_idx) => {
  const res = await axiosInstance().get(
    `/api/chat/chat-log?room_idx=${room_idx}`
  );
  return res.data;
};

// 채팅방 목록 조회 함수
const getChatRoomList = async () => {
  const res = await axiosInstance().get(`/api/chat/chat-room-list`);
  return res.data;
};

export const chatApi = {
  postCreateChatRoom,
  postSaveChatRoom,
  getChatLog,
  getChatRoomList,
};
