import {
  MockProductsData,
  MockUserData,
  MockFreeProductsData,
  MockSellProductsData,
  MockSearchProductsData,
} from "__mock__/faker-data";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import shortId from "shortid";

const productsData = MockProductsData(40);
const UserData = MockUserData(10);
const freeProductsData = MockFreeProductsData(20);
const sellProductsData = MockSellProductsData(20);
const buyerData = [
  {
    id: shortId.generate(),
    Product_img: faker.image.url(),
    title: faker.lorem.sentence(),
    price: Math.floor(Math.random() * 100000),
    User: {
      id: shortId.generate(),
      nickName: faker.person.firstName(),
      profileImg: faker.image.url(),
      manner: Math.floor(Math.random() * 100),
      chatData: {
        buyer: ["구매 희망한다.", "나한테 팔아."],
        marketer: [],
      },
    },
  },
  {
    id: shortId.generate(),
    Product_img: faker.image.url(),
    title: faker.lorem.sentence(),
    price: Math.floor(Math.random() * 100000),
    User: {
      id: shortId.generate(),
      nickName: faker.person.firstName(),
      profileImg: faker.image.url(),
      manner: Math.floor(Math.random() * 100),
      chatData: {
        buyer: ["1000원만 깎아주세요", "ㅋㅎㅋㅎㅋㅎㅋㅎㅋㅋㅎ"],
        marketer: ["ㅋㅋ 돌아가"],
      },
    },
  },
  {
    id: shortId.generate(),
    Product_img: faker.image.url(),
    title: faker.lorem.sentence(),
    price: Math.floor(Math.random() * 100000),
    User: {
      id: shortId.generate(),
      nickName: faker.person.firstName(),
      profileImg: faker.image.url(),
      manner: Math.floor(Math.random() * 100),
      chatData: {
        buyer: [
          "아직 파시나요??",
          "ㅠㅜㅜㅜㅜㅜㅠㅠㅠㅠㅠㅠㅠㅠㅜㅠㅜㅠㅜㅜㅜㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅜㅠㅜㅠㅜㅠㅜㅠㅜㅜ🥹",
        ],
        marketer: [],
      },
    },
  },
];

const signupUserData = [
  {
      email : faker.internet.email(),
      password : faker.internet.password(),
      nickName : faker.person.firstName(),
      phoneNumber : faker.phone.number(),
      location : faker.location.state(),
  },
];

const RegisterstoreData = [
  {
    image : faker.image.avatar(),
    title : faker.lorem.sentence(),
    price : Math.floor(Math.random() * 100000),
    tag : faker.commerce.productName(),
    text : faker.lorem.word(),
    location : faker.location.state(),
  },
];

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

// user 데이터
export const getUserInfoData = http.get("api/user", () => {
  return HttpResponse.json([UserData], {
    status: 200,
  });
});


// 회원가입 데이터
export const postSignupUserData = http.post(
  "api/signup",
  async ({ request }) => {
    const newUser = await request.json();
    const {
      email,
      password,
      nickName,
      phoneNumber,
      location,
    } = newUser;

    const userData = {
      email : email,
      password : password,
      nickName : nickName,
      phoneNumber : phoneNumber,
      location : location,
    }
    
    signupUserData.push(userData)

    return HttpResponse.json(signupUserData, { status: 201 });
  }
);

// 물품등록
export const postregisterData = http.post(
  "api/register",
  async ({ request }) => {
    const newRegister = await request.json();
    const {
    image,
    title,
    price,
    tag,
    text,
    location,
    } = newRegister;

    const RegisterData = {
      image : image,
      title : title,
      price : price,
      tag : tag,
      text : text,
      location : location,
    }
    
    RegisterstoreData.push(RegisterData)

    return HttpResponse.json(RegisterstoreData, { status: 201 });
  }
);

export const getSignupUserData = http.get(
  "api/signup", () => {
    return HttpResponse.json([signupUserData], {
      status: 200,
    });
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
    const newChat = await request.json();
    const { message, buyerUserIndex } = newChat;

    buyerData[buyerUserIndex].User.chatData.marketer.push(message);

    return HttpResponse.json(buyerData, {
      status: 201,
    });
  }
);
