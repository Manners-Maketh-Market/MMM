import { Api } from "apis";
import { atom, selector } from "recoil";

export const mswDataState = atom({
  key: "mswDataState",
  default: [],
});

export const mswDataSell = atom({
  key: "mswDataSell",
  default: "",
});

export const isMenuBarState = atom({
  key: "isMenuBarState",
  default: false,
});

export const mswDataFree = atom({
  key: "mswDataFree",
  default: "",
});

export const mswDataStateSelector = selector({
  key: "mswDataStateSelector",
  get: ({ get }) => {
    const response = get(mswDataState);
    return response;
  },
});
