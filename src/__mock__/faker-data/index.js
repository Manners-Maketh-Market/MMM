import { faker } from "@faker-js/faker";
import shortId from "shortid";

const saleStatusArr = ["중고", "나눔"];

export const MockProductsData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      price: Math.floor(Math.random() * 100000),
      location: faker.location.state(),
      saleStatus: saleStatusArr[Math.floor(Math.random() * 2)],
      User: {
        id: shortId.generate(),
        phoneNumber: faker.phone.number(),
        nickName: faker.person.firstName(),
        profileImg: faker.image.url(),
        manner: Math.floor(Math.random() * 100),
      },
      Product_img: Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map(() => faker.image.url()),
      createdAt: faker.date.between(
        "2023-01-01T00:00:00.000Z",
        "2023-01-31T00:00:00.000Z"
      ),
      isLiked: false,
      likedCount: Math.floor(Math.random() * 100),
    }));

// 무료나눔 상품 목록
export const MockFreeProductsData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      price: 0,
      location: faker.location.state(),
      saleStatus: "나눔",
      User: {
        id: shortId.generate(),
        phoneNumber: faker.phone.number(),
        nickName: faker.person.firstName(),
        profileImg: faker.image.url(),
        manner: Math.floor(Math.random() * 100),
      },
      Product_img: Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map(() => faker.image.url()),
      createdAt: faker.date.between(
        "2023-01-01T00:00:00.000Z",
        "2023-01-31T00:00:00.000Z"
      ),
      isLiked: false,
      likedCount: Math.floor(Math.random() * 100),
    }));

// 중고거래 상품 목록
export const MockSellProductsData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      price: Math.floor(Math.random() * 100000),
      location: faker.location.state(),
      saleStatus: "중고",
      User: {
        id: shortId.generate(),
        phoneNumber: faker.phone.number(),
        nickName: faker.person.firstName(),
        profileImg: faker.image.url(),
        manner: Math.floor(Math.random() * 100),
      },
      Product_img: Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map(() => faker.image.url()),
      createdAt: faker.date.between(
        "2023-10-01T00:00:00.000Z",
        "2023-11-07T00:00:00.000Z"
      ),
      isLiked: false,
      likedCount: Math.floor(Math.random() * 100),
    }));

export const MockSearchProductsData = (searchValue) => {
  const totalData = MockProductsData(100);
  const searchProducts = totalData.filter((el) => {
    return el.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return searchProducts;
};

export const MockUserData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      profileImg: faker.image.url(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      nickName: faker.person.firstName(),
      phoneNumber: faker.phone.number(),
      location: faker.location.state(),
      manner: Math.floor(Math.random() * 100),
      // user's registered products
      MyProducts: {
        id: shortId.generate(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        price: Math.floor(Math.random() * 100000),
        location: faker.location.state(),
        saleStatus: "중고",
        Product_img: Array(Math.floor(Math.random() * 3) + 1)
          .fill()
          .map(() => faker.image.url()),
        createdAt: faker.date.between(
          "2023-01-01T00:00:00.000Z",
          "2023-01-31T00:00:00.000Z"
        ),
        likedCount: Math.floor(Math.random() * 100),
      },
      // user's liked products
      LikedProducts: {
        id: shortId.generate(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        price: Math.floor(Math.random() * 100000),
        location: faker.location.state(),
        saleStatus: saleStatusArr[Math.floor(Math.random() * 2)],
        User: {
          id: shortId.generate(),
          phoneNumber: faker.phone.number(),
          nickName: faker.person.firstName(),
          profileImg: faker.image.url(),
          manner: Math.floor(Math.random() * 100),
        },
        Product_img: Array(Math.floor(Math.random() * 3) + 1)
          .fill()
          .map(() => faker.image.url()),
        createdAt: faker.date.between(
          "2023-01-01T00:00:00.000Z",
          "2023-01-31T00:00:00.000Z"
        ),
        isLiked: true,
        likedCount: Math.floor(Math.random() * 100),
      },
      // user's purchased products
      PurchasedProducts: {
        id: shortId.generate(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        price: Math.floor(Math.random() * 100000),
        location: faker.location.state(),
        saleStatus: saleStatusArr[Math.floor(Math.random() * 2)],
        User: {
          id: shortId.generate(),
          phoneNumber: faker.phone.number(),
          nickName: faker.person.firstName(),
          profileImg: faker.image.url(),
          manner: Math.floor(Math.random() * 100),
        },
        Product_img: Array(Math.floor(Math.random() * 3) + 1)
          .fill()
          .map(() => faker.image.url()),
        createdAt: faker.date.between(
          "2023-01-01T00:00:00.000Z",
          "2023-01-31T00:00:00.000Z"
        ),
        isLiked: false,
        likedCount: Math.floor(Math.random() * 100),
      },
      // user's shared products
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      price: 0,
      location: faker.location.state(),
      saleStatus: "나눔",
      Product_img: Array(Math.floor(Math.random() * 3) + 1)
        .fill()
        .map(() => faker.image.url()),
      createdAt: faker.date.between(
        "2023-01-01T00:00:00.000Z",
        "2023-01-31T00:00:00.000Z"
      ),
      isLiked: false,
      likedCount: Math.floor(Math.random() * 100),
    }));
