import styled from "styled-components";
import { useQueryClient } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { useRecoilValue } from "recoil";
import { buyerChatDataIndex } from "store";

const BuyerBar = () => {
  const readBuyerChatListIndex = useRecoilValue(buyerChatDataIndex);
  const queryClient = useQueryClient();
  const buyerData = queryClient.getQueryData(PRODUCT_QUERY_KEY.BUYER_CHAT_DATA);

  return (
    buyerData && (
      <S.Wrapper>
        <S.BuyerImg
          src={buyerData[0][readBuyerChatListIndex]?.User.profileImg}
        />
        <S.BuyerId>
          {buyerData[0][readBuyerChatListIndex]?.User.nickName}
        </S.BuyerId>
        <S.Celsius>
          {buyerData[0][readBuyerChatListIndex]?.User.manner}
        </S.Celsius>
      </S.Wrapper>
    )
  );
};

export default BuyerBar;

const Wrapper = styled.div`
  width: 730px;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  background-color: white;
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 598px;
    height: 60px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 446px;
  }
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
