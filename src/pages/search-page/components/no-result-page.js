import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const NoResultPage = () => {
  return (
    <S.Wrapper>
      <S.MMMLogo src="assets/logo/MMMlogo.png" alt="logo" />
      <S.NoResultText>검색하신 결과가 없습니다.</S.NoResultText>
    </S.Wrapper>
  );
};

export default NoResultPage;

const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const MMMLogo = styled.img`
  width: 320px;
  height: 109px;
`;

const NoResultText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
`;

const S = {
  MMMLogo,
  NoResultText,
  Wrapper,
};
