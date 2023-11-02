import styled from "styled-components";
import { MockProductsData } from "__mock__/faker-data";

const BuyerBar = () => {
  const MockUserData = MockProductsData(1);

  return (
    <S.Wrapper>
      <S.BuyerImg src={MockUserData[0].User.profileImg} />
      <S.BuyerId>{MockUserData[0].User.nickName}</S.BuyerId>
      <S.Celsius>온도</S.Celsius>
    </S.Wrapper>
  );
};

export default BuyerBar;

const Wrapper = styled.div`
  width: 732px;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
`;

const BuyerImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  margin: 20px;
`;
const BuyerId = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.black};
`;

const Celsius = styled.div`
  width: 60px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.COLORS.primary.blue};
  color: ${({ theme }) => theme.COLORS.primary.blue};
  margin-left: 10px;
  border-radius: 10px;
`;

const S = {
  Wrapper,
  BuyerImg,
  BuyerId,
  Celsius,
};
