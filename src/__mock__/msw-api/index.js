import { rest } from "msw";

export const getProductsData = rest.get("api/products", (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});

export const getUserInfoData = rest.get("api/user", (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});
