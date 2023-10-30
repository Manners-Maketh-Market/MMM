import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SearchInput from "./components/search";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onGoProductsListPage = (saleStatus) => {
    navigate(`/products/${saleStatus}`);
  };
  const onGoMainPage = () => {
    navigate(`/`);
  };

  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.HeaderIcon
          src="assets/logo/BlackLogo.png"
          alt="Logo"
          onClick={onGoMainPage}
        />
        <S.Ul>
          <li onClick={() => onGoProductsListPage("sell")}>중고거래</li>
          <li onClick={() => onGoProductsListPage("free")}>무료나눔</li>
          <li>시세조회</li>
        </S.Ul>
      </S.LeftContainer>
      <S.RightIconContainer>
        <SearchInput />
        <S.HeaderIcon src="assets/icon/user.png" alt="User" />
        <S.HeaderIcon src="assets/icon/my_store.png" alt="myStore" />
      </S.RightIconContainer>
      <S.MobileMenuBar src="assets/icon/menubar.png" alt="menubar" />
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
  padding: 0px 32px;
  margin-bottom: 80px;
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
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
  }
`;

const HeaderIcon = styled.img`
  width: 24px;
`;

const S = {
  Wrapper,
  LeftContainer,
  RightIconContainer,
  MobileMenuBar,
  HeaderIcon,
  Ul,
};
