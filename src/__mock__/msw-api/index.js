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

const signupData = [
  {
    email: faker.internet.email(),
    pw: faker.internet.password(),
    nickName: faker.person.firstName(),
    phone: faker.phone.number(),
    region: faker.location.state(),
  },
];

const RegisterstoreData = [
  {
    image: faker.image.avatar(),
    title: faker.lorem.sentence(),
    price: Math.floor(Math.random() * 100000),
    tag: faker.commerce.productName(),
    text: faker.lorem.word(),
    location: faker.location.state(),
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

// 회원가입
export const postSignupData = http.post("api/user", async ({ request }) => {
  const newUser = await request.json();
  const { email, pw, nickName, phone, region } = newUser;

  const newUserData = {
    email: email,
    pw: pw,
    nickName: nickName,
    phone: phone,
    region: region,
  };

  signupData.push(newUserData);

  return HttpResponse.json(signupData, { status: 200 });
});

// 로그인
export const postLoginData = http.post(
  "api/user/login",
  async ({ request }) => {
    const loginUser = await request.json();
    const { email, pw } = loginUser;
    console.log("loginUser >>", loginUser);

    const findUser = signupData.find(
      email === signupData.email && pw === signupData.pw
    );
    console.log("findUser >>> ", findUser);

    return HttpResponse.json(loginUser, { status: 200 });
  }
);

// 내 물품 등록
export const postRegisterData = http.post(
  "api/register",
  async ({ request }) => {
    const newRegister = await request.json();
    const { image, title, price, tag, text, location } = newRegister;

    const RegisterData = {
      image: image,
      title: title,
      price: price,
      tag: tag,
      text: text,
      location: location,
    };

    postRegisterData.push(RegisterData);

    return HttpResponse.json(postRegisterData, { status: 201 });
  }
);

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
