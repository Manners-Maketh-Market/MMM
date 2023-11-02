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

/*
  user = {
    nickname: ,
    profileImg: ,
    location: ,
    chatting : [
      안녕하세요,
      얼마 맞나용,
      
    ]
  }
  


  전송 버튼 클릭
  -> 
  post 함수 써서

  채팅 내역 map 돌리고 있는 data로 보내고

  refetch 함수 실행해서

  화면 랜더

  채팅 최신화
*/