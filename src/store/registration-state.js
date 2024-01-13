import { atom } from "recoil";

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
