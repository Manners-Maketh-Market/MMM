import { MockProductsData, MockUserData } from "__mock__/faker-data";
import { http, HttpResponse } from "msw";

const productsData = MockProductsData(40);
const UserData = MockUserData(10);

export const getProductsData = http.get("api/products", () => {
  return HttpResponse.json([productsData], {
    status: 200,
  });
});

export const getUserInfoData = http.get("api/user", () => {
  return HttpResponse.json([UserData], {
    status: 200,
  });
});
