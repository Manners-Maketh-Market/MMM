import { atom } from "recoil";

export const isMenuBarState = atom({
  key: "isMenuBarState",
  default: false,
});

/*
- msw 관련 state 및 사용하고 있지 않은 state 삭제(임시로 주석 처리 해놨습니다.)
- 채팅 관련 state는 chat-state.js에서 관리
- 닉네임.이메일 관련 state는 registration-state.js에서 관리
- 메뉴바 관련 state는 menubar-state.js에서 관리
*/

// export const buyerChatDataIndex = atom({
//   key: "buyerChatDataIndex",
//   default: null,
// });

// export const RegisterDataIndex = atom({
//   key: "RegisterDataIndex",
//   default: null,
// });

// // 사용자가 입장한 채팅방 번호
// export const chatProductIdxListArr = atom({
//   key: "chatProductIdxListArr",
//   default: [],
// });

// //test
// export const test = atom({
//   key: "test",
//   default: false,
// });

// // 물품 현황 확인
// export const myProductList = atom({
//   key: "myProductList",
//   default: null,
// });
