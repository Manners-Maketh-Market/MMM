import { atom } from "recoil";

export const mswDataState = atom({
  key: "mswDataState",
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

export const isCreateChat = atom({
  key: "isCreateChat",
  default: false,
});

export const user = atom({
  key: "user",
  default: {
    email: "",
    nickName: "",
  },
});

// 로그인 여부 확인
export const isLogin = atom({
  key: "isLogin",
  default: localStorage.getItem("token") ? true : false,
});

export const signupUserDataIndex = atom({
  key: "signupUserDataIndex",
  default: null,
});
