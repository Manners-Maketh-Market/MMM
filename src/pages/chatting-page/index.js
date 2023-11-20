import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import BuyerChattingList from "./components/buyer-list/buyer-chatting-list";
import ChattingRoom from "./components/chatting-room";
import ChattingLogo from "./components/chatting-logo";

const ChattingPage = () => {
  return (
    <S.Wrapper>
      <ChattingLogo />
      <S.ChattingWrapper>
        <BuyerChattingList />
        <ChattingRoom />
      </S.ChattingWrapper>
    </S.Wrapper>
  );
};

export default ChattingPage;

const Wrapper = styled.div`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 80px;
  }
`;

const ChattingWrapper = styled.div`
  ${flexCenter}
`;

const S = {
  Wrapper,
  ChattingWrapper,
};
