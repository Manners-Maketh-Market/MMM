import { atom, selector } from "recoil";

const token = localStorage.getItem("access_token");

export const TokenAtom = atom({
  key: "TokenAtom",
  default: token ? true : false,
});

export const isLoginSelector = selector({
  key: "isLoginSelector",
  get: ({ get }) => !!get(TokenAtom),
});
