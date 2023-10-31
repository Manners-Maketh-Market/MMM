import {
  MockProductsData,
  MockUserData,
  MockFreeProductsData,
  MockSellProductsData,
} from "__mock__/faker-data";
import { http, HttpResponse } from "msw";

const productsData = MockProductsData(40);
const UserData = MockUserData(10);
const freeProductsData = MockFreeProductsData(20);
const sellProductsData = MockSellProductsData(20);

export const getProductsData = http.get("api/products", () => {
  return HttpResponse.json([productsData], {
    status: 200,
  });
});

// 무료나눔 상품 데이터
export const getFreeProductsData = http.get("api/products/free", () => {
  return HttpResponse.json([freeProductsData], {
    status: 200,
  });
});

// 중고거래 상품 데이터
export const getSellProductsData = http.get("api/products/sell", () => {
  return HttpResponse.json([sellProductsData], {
    status: 200,
  });
});

export const getUserInfoData = http.get("api/user", () => {
  return HttpResponse.json([UserData], {
    status: 200,
  });
});
