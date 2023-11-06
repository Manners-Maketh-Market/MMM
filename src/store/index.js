import { atom } from "recoil";

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
