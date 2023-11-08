import { atom } from "recoil";

export const mswDataState = atom({
  key: "mswDataState",
  default: [],
});

export const isMenuBarState = atom({
  key: "isMenuBarState",
  default: false,
});
