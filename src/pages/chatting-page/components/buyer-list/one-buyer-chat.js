import { useRecoilValue, useSetRecoilState } from "recoil";
import { isMobileChattingRoom } from "store";
import { buyerChatDataIndex } from "store";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const OneChat = ({ profileImg, nickName, buyerChat, productImg, index }) => {
  const setBuyerChatDataIndex = useSetRecoilState(buyerChatDataIndex);
  const readBuyerChatListIndex = useRecoilValue(buyerChatDataIndex);
  const setIsMobileChattingRoom = useSetRecoilState(isMobileChattingRoom);

  const onBuyerBarChange = (index) => {
    setBuyerChatDataIndex(index);
  };

  const onOpenMobileChattingRoom = () => {
    setIsMobileChattingRoom((prev) => !prev);
  };

  return (
    <S.Wrapper
      onClick={() => {
        onBuyerBarChange(index);
        onOpenMobileChattingRoom();
      }}
      className={index === readBuyerChatListIndex ? "FocusWrapper" : ""}
    >
      <S.BuyerInfo>
        <S.BuyerProfileImg src={profileImg} />
        <S.IdAndChat>
          <S.BuyerId>{nickName}</S.BuyerId>
          <S.ChatContent>{buyerChat}</S.ChatContent>
        </S.IdAndChat>
      </S.BuyerInfo>
      <S.ProductImg src={productImg} />
    </S.Wrapper>
  );
};

export default OneChat;

const Wrapper = styled.div`
  width: 448px;
  height: 72px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  display: flex;
  justify-content: space-between;
  &.FocusWrapper {
    background-color: rgba(40, 33, 144, 0.1);
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    &.FocusWrapper {
      background-color: white;
    }
  }
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
