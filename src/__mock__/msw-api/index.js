import {
  MockProductsData,
  MockUserData,
  MockFreeProductsData,
  MockSellProductsData,
  MockSearchProductsData,
  MockBuyerData,
} from "__mock__/faker-data";

import { http, HttpResponse } from "msw";

const productsData = MockProductsData(40);
const UserData = MockUserData(10);
const freeProductsData = MockFreeProductsData(20);
const sellProductsData = MockSellProductsData(20);
const buyerData = MockBuyerData(15);

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

// 검색 결과 상품 데이터
export const getSearchProductsData = http.get(
  "api/products/search/:title",
  ({ params }) => {
    return HttpResponse.json([MockSearchProductsData(params.title)], {
      status: 200,
    });
  }
);

export const getUserInfoData = http.get("api/user", () => {
  return HttpResponse.json([UserData], {
    status: 200,
  });
});

export const postUserInfoData = http.post("api/user", async () => {
  const user = await requestAnimationFrame.json();
  const { email, password, nickname } = user;
  const token = "jtw-token";
  return HttpResponse.json(
    { email, password, nickname, token },
    { status: 200 }
  );
});

// 상세페이지 데이터
export const getDetailProductData = http.get(
  "api/products/detail/:id",
  ({ params }) => {
    return HttpResponse.json([]);
  }
);

// 채팅 구현 데이터
export const getBuyerData = http.get("api/chat/buyer", () => {
  return HttpResponse.json([buyerData], {
    status: 200,
  });
});

export const postBuyerData = http.post(
  "api/chat/buyer",
  async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newChat = await request.json();
    // Push the new post to the map of all posts. (key, value)
    buyerData.set(newChat.nickName, newChat);

    return HttpResponse.json([newChat], {
      status: 200,
    });
  }
);
