import { Outlet } from "react-router-dom";
import ScrollIcon from "components/scroll-icon";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isMenuBarState } from "store";
import Header from "../header";
import Footer from "../footer";

const MobileLayout = () => {
  const isShowMenuBar = useRecoilValue(isMenuBarState);
  const setIsShowMenuBar = useSetRecoilState(isMenuBarState);

  const onCloseMenubar = () => {
    if (!isShowMenuBar) {
      return setIsShowMenuBar(isShowMenuBar);
    }
    setIsShowMenuBar((prev) => !prev);
  };

  return (
    <>
      <Header />
      <MenuBarOnBackground onClick={onCloseMenubar}>
        <PointerEventsNone>
          <Outlet />
          <ScrollIcon />
          <Footer />
        </PointerEventsNone>
      </MenuBarOnBackground>
    </>
  );
};

export default MobileLayout;

const MenuBarOnBackground = styled.div`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    opacity: 0.3;
  }
`;

const PointerEventsNone = styled.div`
  pointer-events: none;
`;
