import styled from "styled-components";
import OneChat from "./one-buyer-chat";
import { useQuery } from "react-query";
import { chatApi } from "apis";
import { useRecoilValue } from "recoil";
import { isMobileChattingRoom } from "store";

const BuyerChattingList = () => {
  const isMobileChattingRoomState = useRecoilValue(isMobileChattingRoom);

  const { data: chatProductList } = useQuery(["qqqqqqq"], () =>
    chatApi.getChatRoomList()
  );

  return (
    <S.Wrapper isMobileChattingRoomState={isMobileChattingRoomState}>
      {chatProductList?.chats?.map((el, index) => (
        <OneChat
          key={el.idx}
          productId={el.product.idx}
          roomId={el.idx}
          productTitle={el.product.title}
          price={el.product.price}
          profileImg={el.product.img_url}
          nickName={el.lastMessageUser.nick_name}
          productImg={el.product.img_url}
          lastMessage={el.lastMessage}
          index={index}
        />
      ))}
    </S.Wrapper>
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
