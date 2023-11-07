import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import MMMlogo from "../../../images/logo/MMMlogo.png";

const NoResultPage = () => {
  return (
    <S.Wrapper>
      <S.MMMLogo src={MMMlogo} alt="logo" />
      <S.NoResultText>검색하신 결과가 없습니다.</S.NoResultText>
    </S.Wrapper>
  );
};

export default NoResultPage;

const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  padding-top: 36px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin-top: 40px;
  }
`;

const MMMLogo = styled.img`
  width: 320px;
  height: 109px;
`;

const NoResultText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  margin: 40px;
`;

const S = {
  MMMLogo,
  NoResultText,
  Wrapper,
};
