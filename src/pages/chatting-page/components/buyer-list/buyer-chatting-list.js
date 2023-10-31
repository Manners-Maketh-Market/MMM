import styled from "styled-components";
import OneChat from "./one-buyer-chat";

const BuyerChattingList = () => {
  return (
    <S.Wrapper>
      <OneChat />
    </S.Wrapper>
  );
};

export default BuyerChattingList;

const Wrapper = styled.div`
  width: 448px;
  height: 1462px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
`;

const S = {
  Wrapper,
};
