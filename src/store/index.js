import { atom } from "recoil";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";

export const mswDataState = atom({
  key: "mswDataState",
  default: [],
});

export const mswDataTest = atom({
  key: "mswDataTest",
  default: "",
});
