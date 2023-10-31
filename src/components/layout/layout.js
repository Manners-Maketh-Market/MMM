import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import ScrollIcon from "components/scroll-icon";
import styled from "styled-components";

/*
scroll top 작동하는지 확인하기 위해서 임시로 Layout에 넣어뒀음.
(로그인, 회원가입, 채팅페이지 에서는 빠져야함!)
추후에 수정 예정
*/

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollIcon />
      <Footer />
    </>
  );
};

export default Layout;
