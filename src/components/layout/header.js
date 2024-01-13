import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import Search from "./components/search";
import { useNavigate } from "react-router-dom";
import BlackLogo from "../../images/logo/BlackLogo.png";
import my_store from "../../images/icon/my_store.png";
import user from "../../images/icon/user.png";
import menubar from "../../images/icon/menubar.png";
import close from "../../images/icon/close.png";
import MenuBar from "./components/menu-bar";
import { useRecoilState } from "recoil";
import { useState } from "react";
import MyPageModal from "../my-page-modal";
import { isMenuBarState } from "store/menubar-state";

const Header = () => {
  const navigate = useNavigate();

  const [isShowMenuBar, setIsShowMenuBar] = useRecoilState(isMenuBarState);
  const [isMyPageModal, setIsMyPageModal] = useState(false);

  const onGoProductsListPage = (saleStatus) => {
    navigate(`/MMM/products/${saleStatus}`);
  };
  const onGoMainPage = () => {
    navigate(`/MMM/home`);
  };
  const onGoPriceCheckPage = () => {
    navigate("/MMM/pricecheckpage");
  };
  const onGoMyPage = () => {
    setIsMyPageModal((prev) => !prev);
  };

  const onGoRegisterProductPage = () => {
    navigate("/MMM/my-page/registerProductForm");
  };

  const onOpenAndCloseMenuBar = () => {
    setIsMyPageModal((prev) => !prev);
  };

  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.HeaderLogoIcon src={BlackLogo} alt="Logo" onClick={onGoMainPage} />
        <S.Ul>
          <li onClick={() => onGoProductsListPage("0")}>중고거래</li>
          <li onClick={() => onGoProductsListPage("1")}>무료나눔</li>
          <li onClick={onGoPriceCheckPage}>시세조회</li>
        </S.Ul>
      </S.LeftContainer>
      <S.RightIconContainer>
        <Search />
        <S.HeaderIcon src={user} alt="User" onClick={onGoMyPage} />
        {isMyPageModal && <MyPageModal setIsMyPageModal={setIsMyPageModal} />}
        <S.HeaderIcon src={my_store} alt="myStore" onClick={onGoRegisterProductPage} />
      </S.RightIconContainer>
      {isShowMenuBar ? <S.MobileMenuBar src={close} alt="close" onClick={onOpenAndCloseMenuBar} /> : <S.MobileMenuBar src={menubar} alt="menubar" onClick={onOpenAndCloseMenuBar} />}
      {isShowMenuBar && <MenuBar />}
    </S.Wrapper>
  );
};
export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    position: fixed;
    z-index: 9999;
  }
`;

const Ul = styled.ul`
  ${flexCenter}
  & > li {
    padding: 15px;
    &:hover {
      color: ${({ theme }) => theme.COLORS.primary.yellow};
    }
  }
`;

const LeftContainer = styled.div`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    ul > li {
      display: none;
    }
  }

  ${flexCenter};
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  &:hover {
    cursor: pointer;
  }
  & > img {
    margin-right: 20px;
  }
`;

const RightIconContainer = styled.div`
  ${flexCenter};
  & > img {
    margin: 15px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    & > img {
      display: none;
    }
  }
`;

const MobileMenuBar = styled.img`
  width: 24px;
  display: none;
  cursor: pointer;
  margin-right: 24px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
  }
`;

const HeaderIcon = styled.img`
  width: 24px;
  cursor: pointer;
`;

const HeaderLogoIcon = styled.img`
  margin-left: 32px;
  width: 24px;
`;

const S = {
  Wrapper,
  LeftContainer,
  RightIconContainer,
  MobileMenuBar,
  HeaderIcon,
  HeaderLogoIcon,
  Ul,
};
