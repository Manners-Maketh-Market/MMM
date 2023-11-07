import styled from "styled-components";
import OneChat from "./one-buyer-chat";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { worker } from "__mock__/browser";
import { useRecoilValue } from "recoil";
import { isMobileChattingRoom } from "store";

const BuyerChattingList = () => {
  const isMobileChattingRoomState = useRecoilValue(isMobileChattingRoom);

  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  const { data: buyerData } = useQuery(
    [PRODUCT_QUERY_KEY.BUYER_CHAT_DATA],
    () => Api.getBuyerChatData()
  );

  return (
    buyerData && (
      <S.Wrapper isMobileChattingRoomState={isMobileChattingRoomState}>
        {buyerData[0].map((el, index) => (
          <OneChat
            key={el.id}
            index={index}
            profileImg={el.User.profileImg}
            nickName={el.User.nickName}
            buyerChat={el.User.chatData.buyer[0]}
            productImg={el.Product_img}
          />
        ))}
      </S.Wrapper>
    )
  );
};

export default BuyerChattingList;

const Wrapper = styled.div`
  width: 448px;
  height: 700px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  overflow-x: hidden;
  overflow-y: auto;
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 300px;
    height: 570px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: ${(props) => (props.isMobileChattingRoomState ? "none" : "block")};
  }
`;

const S = {
  Wrapper,
};
