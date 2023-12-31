import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isMenuBarState } from "store";

const MenuBar = () => {
  const navigate = useNavigate();

  const setIsShowMenuBar = useSetRecoilState(isMenuBarState);

  const onGoProductsListPage = (saleStatus) => {
    navigate(`/products/${saleStatus}`);
    setIsShowMenuBar((prev) => !prev);
  };

  const onGoPriceCheckPage = () => {
    navigate("/pricecheckpage");
    setIsShowMenuBar((prev) => !prev);
  };

  const onGoMyPage = () => {
    navigate("/my-page");
    setIsShowMenuBar((prev) => !prev);
  };

  const onGoRegisterProductPage = () => {
    navigate("/my-page/registerProductForm");
    setIsShowMenuBar((prev) => !prev);
  };

  return (
    <S.Wrapper>
      <S.Ul>
        <li onClick={() => onGoProductsListPage("sell")}>중고거래</li>
        <li onClick={() => onGoProductsListPage("free")}>무료나눔</li>
        <li onClick={onGoPriceCheckPage}>시세조회</li>
        <li onClick={onGoMyPage}>마이페이지</li>
        <li onClick={onGoRegisterProductPage}>물품등록</li>
      </S.Ul>
    </S.Wrapper>
  );
};
export default MenuBar;

const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  width: 100%;
  background-color: white;
  display: none;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
  }
`;

const Ul = styled.ul`
  ${flexCenter}
  flex-direction:column;
  & > li {
    width: 100%;
    /* text-align: center; */
    padding: 15px;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.COLORS.primary.yellow};
      background-color: ${({ theme }) => theme.COLORS.gray[100]};
    }
  }
`;

const S = {
  Wrapper,
  Ul,
};
