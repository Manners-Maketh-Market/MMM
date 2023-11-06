import styled from "styled-components";
import ProductBar from "./components/product-bar";
import BuyerBar from "./components/buyer-bar";
import ChattingBar from "./components/chatting-bar";
import SendForm from "./components/send-form";
import { useRecoilValue } from "recoil";
import { isMobileChattingRoom } from "store";

const ChattingRoom = () => {
  const isMobileChattingRoomState = useRecoilValue(isMobileChattingRoom);

  return (
    <S.Wrapper isMobileChattingRoomState={isMobileChattingRoomState}>
      <BuyerBar />
      <ProductBar />
      <ChattingBar />
      <SendForm />
    </S.Wrapper>
  );
};

export default ChattingRoom;

const Wrapper = styled.div`
  width: 732px;
  height: 700px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  position: relative;
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 600px;
    height: 570px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: ${(props) => (props.isMobileChattingRoomState ? "block" : "none")};
    width: 448px;
  }
`;

const S = {
  Wrapper,
};
