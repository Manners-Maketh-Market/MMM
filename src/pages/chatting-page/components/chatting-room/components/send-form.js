import { worker } from "__mock__/browser";
import styled from "styled-components";

const SendForm = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  return (
    <S.SendFormBox>
      <S.SendMessage placeholder="메세지를 입력하세요." />
      <S.SendBtn>전송</S.SendBtn>
    </S.SendFormBox>
  );
};

export default SendForm;

const SendFormBox = styled.form`
  position: relative;
  position: absolute;
  bottom: 1%;
  left: 2.5%;
`;

const SendBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 40px;
  right: 15px;
  bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.primary.logo};
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
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 570px;
    height: 100px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 424px;
  }
`;

const S = {
  SendFormBox,
  SendMessage,
  SendBtn,
};
