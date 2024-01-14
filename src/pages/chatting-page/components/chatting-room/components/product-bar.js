import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { targetChatRoom } from "store/chat-state";

const ProductBar = () => {
  const targetChatRoomData = useRecoilValue(targetChatRoom);

  return (
    <S.Wrapper>
      <S.ProductImg src={targetChatRoomData.productImg} />
      <S.PriceAndTitle>
        <S.Price>{targetChatRoomData.price}원</S.Price>
        <S.ProductTitle>{targetChatRoomData.productTitle}</S.ProductTitle>
      </S.PriceAndTitle>
    </S.Wrapper>
  );
};

export default ProductBar;

const Wrapper = styled.div`
  display: flex;
  width: 730px;
  height: 80px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  border-bottom: 2px solid ${({ theme }) => theme.COLORS.gray[300]};
  background-color: white;
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 598px;
    height: 60px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 446px;
  }
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 20px;
`;

const PriceAndTitle = styled.div`
  flex-direction: column;
`;

const Price = styled.p`
  margin-bottom: 10px;
`;

const ProductTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  color: ${({ theme }) => theme.COLORS.gray[500]};
`;

const S = {
  Wrapper,
  ProductImg,
  Price,
  ProductTitle,
  PriceAndTitle,
};
