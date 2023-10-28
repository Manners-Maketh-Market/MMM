import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SearchInput from "./components/search";

const Header = () => {
  const HeaderNavBar = ["중고거래", "무료나눔", "시세조회"];

  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.HeaderIcon src="assets/logo/BlackLogo.png" alt="Logo" />
        <S.Ul>
          {HeaderNavBar.map((item) => (
            <li>{item}</li>
          ))}
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
