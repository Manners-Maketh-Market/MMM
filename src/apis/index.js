import { axiosInstance } from './core';

// 중고거래, 무료나눔 텍스트 클릭시에 이동되는 페이지에서 사용하는 데이터입니다.
const getUsedOrFreeProduct = async (param) => {
    const res = await axiosInstance.get(`/products/${param}`);
    return res.data;
};

// styled-component의 const S같은 기능 (번들링 사이즈가 줄어든다!)
export const Api = {
    getUsedOrFreeProduct,
};
