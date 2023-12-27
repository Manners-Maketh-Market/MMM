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

// 이메일 중복체크 함수
export const isEmailCheckPass = atom({
  key: "isEmailCheckPass",
  default: false,
});

// 닉네임 중복체크 함수
export const isNickNameCheckPass = atom({
  key: "isNickNameCheckPass",
  default: false,
});

export const RegisterDataIndex = atom({
  key: "RegisterDataIndex",
  default: null,
});

// 물품 현황 확인
export const myProductList = atom({
  key: "myProductList",
  default: null,
});

// 사용자가 입장한 채팅방 번호
export const chatProductIdxListArr = atom({
  key: "chatProductIdxListArr",
  default: [],
});

//test
export const test = atom({
  key: "test",
  default: false,
});

// 선택한 유저 채팅 정보
export const targetChatRoom = atom({
  key: "targetChatRoom",
  default: {},
});

// 현재 채팅하고 있는 상대 닉네임
export const currentChatUser = atom({
  key: "currentChatUser",
  default: null,
});
