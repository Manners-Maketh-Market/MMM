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
