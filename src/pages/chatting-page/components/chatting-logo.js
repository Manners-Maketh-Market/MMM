import styled from "styled-components";
import exit from "../../../images/icon/exit.png";
import { useRecoilState } from "recoil";
import { isMobileChattingRoom } from "store/chat-state";

const ChattingLogo = () => {
  const [isMobileChattingRoomState, setIsMobileChattingRoomState] = useRecoilState(isMobileChattingRoom);

  const onCloseChattingRoom = () => {
    setIsMobileChattingRoomState((prev) => !prev);
  };

  return (
    <S.LogoWrapper>
      {isMobileChattingRoomState && <S.ExitIcon src={exit} alt="exit" onClick={onCloseChattingRoom} />}
      <S.Logo>MMM</S.Logo>
      <S.LogoText>manners makes market</S.LogoText>
    </S.LogoWrapper>
  );
};
export default ChattingLogo;

const LogoWrapper = styled.div`
  margin: 0 auto;
  width: 1180px;
  background-color: ${({ theme }) => theme.COLORS.primary.logo};
  text-align: center;
  color: #fff;
  padding: 10px 0px;
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 900px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 448px;
    position: relative;
  }
`;

const Logo = styled.p`
  font-style: italic;
  color: white;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.extraLarge};
  padding-bottom: 8px;
`;

const LogoText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
`;

const ExitIcon = styled.img`
  display: none;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
    position: absolute;
    width: 30px;
    top: 30%;
    left: 5%;
    cursor: pointer;
  }
`;

const S = {
  LogoWrapper,
  Logo,
  LogoText,
  ExitIcon,
};
