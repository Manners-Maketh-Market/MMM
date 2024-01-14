import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import ScrollIcon from "components/scroll-icon";
import { useRecoilValue } from "recoil";
import MobileLayout from "./components/mobile-layout";
import { isMenuBarState } from "store/menubar-state";

const Layout = () => {
  const isShowMenuBar = useRecoilValue(isMenuBarState);

  return (
    <>
      {isShowMenuBar ? (
        <MobileLayout />
      ) : (
        <>
          <Header />
          <Outlet />
          <ScrollIcon />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
