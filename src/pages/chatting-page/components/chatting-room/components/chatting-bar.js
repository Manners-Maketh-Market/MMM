import styled from "styled-components";
import { useQueryClient } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { useRecoilValue } from "recoil";
import { buyerChatDataIndex } from "store";

const ChattingBar = () => {
  const readBuyerChatListIndex = useRecoilValue(buyerChatDataIndex);
  const queryClient = useQueryClient();
  const buyerData = queryClient.getQueryData(PRODUCT_QUERY_KEY.BUYER_CHAT_DATA);

  return (
    buyerData && (
      <S.Wrapper>
        {buyerData[0][readBuyerChatListIndex]?.User.chatData.buyer.map(
          (chat) => (
            <S.BuyerBar>{chat}</S.BuyerBar>
          )
        )}
        {buyerData[0][readBuyerChatListIndex]?.User.chatData.marketer.map(
          (chat) => (
            <S.MarketerFlex>
              <S.MarketerBar>{chat}</S.MarketerBar>
            </S.MarketerFlex>
          )
        )}
      </S.Wrapper>
    )
  );
};

export default ChattingBar;

const Wrapper = styled.div`
  height: 380px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const BuyerBar = styled.p`
  margin: 12px;
  width: max-content;
  padding: 10px;
  border-radius: 24px;
  background-color: rgba(40, 33, 144, 0.1);
  max-width: 400px;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
`;

const MarketerFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MarketerBar = styled.p`
  margin: 6px 12px;
  width: max-content;
  padding: 10px;
  border-radius: 24px;
  color: ${({ theme }) => theme.COLORS.white};
  background-color: ${({ theme }) => theme.COLORS.primary.logo};
  max-width: 400px;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
`;

const S = {
  Wrapper,
  BuyerBar,
  MarketerFlex,
  MarketerBar,
};
