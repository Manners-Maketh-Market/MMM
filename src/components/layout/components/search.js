import MMMInput from "components/input";
import styled from "styled-components";
import SearchInput from "./search-input";
import SearchIconImage from "../../../images/icon/search.png";
import UseNavigation from "hooks/use-navigation";

const Search = () => {
  const { goToMainPage, goToSearchItemPage } = UseNavigation();

  // searchPage 이동 함수
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.product.value;
    if (e.target.product.value === "") {
      alert("검색어를 입력하세요.");
      return goToMainPage();
    }
    goToSearchItemPage(inputValue);
  };

  return (
    <S.Wrapper onSubmit={onSearchSubmit}>
      <SearchInput size={"search"} placeholder="Search" name="product" />
      <S.SearchBtn type="submit">
        <S.SearchIcon src={SearchIconImage} />
      </S.SearchBtn>
    </S.Wrapper>
  );
};

export default Search;

const Wrapper = styled.form`
  position: relative;
  display: flex;
  margin-top: 12px;
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
const SearchIcon = styled.img`
  position: absolute;
  top: 4px;
  right: 6px;
`;

const S = {
  SearchIcon,
  SearchBtn,
  Wrapper,
};
