import { atom } from "recoil";

// 채팅 관련 state
export const isMobileChattingRoom = atom({
  key: "isMobileChattingRoom",
  default: false,
});

export const isCreateChat = atom({
  key: "isCreateChat",
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
