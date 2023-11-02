import { MockProductsData } from "__mock__/faker-data";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const OneChat = () => {
  const MockUserData = MockProductsData(1);

  return (
    <S.Wrapper>
      <S.BuyerInfo>
        <S.BuyerProfileImg src={MockUserData[0].User.profileImg} />
        <S.IdAndChat>
          <S.BuyerId>유저 아이디</S.BuyerId>
          <S.ChatContent>채팅내용 입니다.</S.ChatContent>
        </S.IdAndChat>
      </S.BuyerInfo>
      <S.ProductImg src={MockUserData[0].Product_img[0]} />
    </S.Wrapper>
  );
};

export default OneChat;

const Wrapper = styled.div`
  width: 448px;
  height: 72px;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  display: flex;
  justify-content: space-between;
`;

const BuyerInfo = styled.div`
  ${flexCenter}
`;

const BuyerProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  margin: 10px;
`;

const IdAndChat = styled.div``;

const BuyerId = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.black};
`;

const ChatContent = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  color: ${({ theme }) => theme.COLORS.gray[500]};
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 30px;
`;

const S = {
  Wrapper,
  BuyerProfileImg,
  BuyerId,
  ChatContent,
  ProductImg,
  IdAndChat,
  BuyerInfo,
};
