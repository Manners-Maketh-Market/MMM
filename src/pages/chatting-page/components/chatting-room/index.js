import styled from "styled-components";
import ProductBar from "./components/product-bar";
import BuyerBar from "./components/buyer-bar";
import ChattingBar from "./components/chatting-bar";
import { flexCenter } from "styles/common.style";

const ChattingRoom = () => {
  return (
    <S.Wrapper>
      <BuyerBar />
      <ProductBar />
      <ChattingBar />
      <S.SendForm>
        <S.SendMessage placeholder="메세지를 입력하세요." />
        <S.SendBtn>전송</S.SendBtn>
      </S.SendForm>
    </S.Wrapper>
  );
};

export default ChattingRoom;

const Wrapper = styled.div`
  width: 732px;
  height: 1462px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
`;

const SendForm = styled.form`
  position: relative;
  ${flexCenter}
`;

const SendBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 40px;
  right: 50px;
  bottom: 15px;
  border-radius: 4px;
  &:hover {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.primary.blue};
  }
`;

const SendMessage = styled.textarea`
  border-radius: 4px;
  width: 694px;
  height: 148px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  padding: 15px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const S = {
  Wrapper,
  SendForm,
  SendMessage,
  SendBtn,
};

/*
  1. fakerJS로 가상의 유저 데이터 생성 + 지금 내가 로그인 되어있단 가정 하에 내 정보 데이터 생성

  2. msw-api에 상대방 데이터 + 내 데이터 받아오는 msw 정의

  3. msw에 post정의 ( -> 전송 버튼 클릭시 post.url로 input값  바디 데이터로 전달)

  4. 바디 데이터가 추가된 데이터 불러와서 채팅 바 컴포넌트에서 map 돌리기

  
  그 부분은 채팅 페이지 우측에 인풋창 하나 만들어서 1인 2역 하는 걸로 해볼까용?
  
*/
