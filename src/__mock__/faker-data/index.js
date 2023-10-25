import { faker } from "@faker-js/faker";
import shortId from "shortid";

export const MockProductsData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      price: Math.floor(Math.random() * 100000),
      location: faker.location.state(),
      category: Math.floor(Math.random() * 10),
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

export const MockUserData = (count) =>
  Array(count)
    .fill()
    .map(() => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
      nickName: faker.person.firstName(),
      phoneNumber: faker.phone.number(),
      location: faker.location.state(),
    }));
