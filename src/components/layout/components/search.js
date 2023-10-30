import MMMInput from "components/input";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchInput = () => {
  const navigate = useNavigate();

  // searchPage 이동 함수
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.product.value;
    navigate(`products/search/${inputValue}`);
  };

  return (
    <S.Wrapper onSubmit={onSearchSubmit}>
      <MMMInput size={"search"} placeholder="Search" name="product" />
      <S.SearchBtn type="submit">
        <S.SearchIcon src="assets/icon/search.png" />
      </S.SearchBtn>
    </S.Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.form`
  position: relative;
  display: flex;
`;

const SearchIcon = styled.img`
  width: 24px;
`;

const SearchBtn = styled.button`
  background: 0px;
  position: absolute;
  top: 7px;
  right: 10px;
  z-index: 99999;
  &:hover {
    cursor: pointer;
  }
`;

const S = {
  SearchIcon,
  Wrapper,
  SearchBtn,
};
