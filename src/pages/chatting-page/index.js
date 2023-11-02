import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import MMMLogo from "../../images/logo/MMMlogo.png";
import BuyerChattingList from "./components/buyer-list/buyer-chatting-list";
import ChattingRoom from "./components/chatting-room";

const ChattingPage = () => {
  return (
    <S.Wrapper>
      <S.ImgWrapper>
        <S.LogoImg src={MMMLogo} alt="User" />
      </S.ImgWrapper>

      <S.ChattingWrapper>
        <BuyerChattingList />
        <ChattingRoom />
      </S.ChattingWrapper>
    </S.Wrapper>
  );
};

export default ChattingPage;

const Wrapper = styled.div``;

const ChattingWrapper = styled.div`
  ${flexCenter}
`;

const ImgWrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const LogoImg = styled.img`
  ${flexCenter}
  margin-bottom : 40px;
`;

const S = {
  Wrapper,
  ChattingWrapper,
  LogoImg,
  ImgWrapper,
};
