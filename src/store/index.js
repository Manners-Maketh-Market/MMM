import { atom } from "recoil";

export const mswDataState = atom({
    key: 'mswDataState',
    default: [],
});

export const mswDataTest = atom({
  key: "mswDataTest",
  default: "",
});

export const isMenuBarState = atom({
  key: "isMenuBarState",
  default: false,
});

export const buyerChatDataIndex = atom({
  key: "buyerChatDataIndex",
  default: null,
});

export const isMobileChattingRoom = atom({
  key: "isMobileChattingRoom",
  default: false,
});

export const isMenuBarState = atom({
    key: 'isMenuBarState',
    default: false,
});
