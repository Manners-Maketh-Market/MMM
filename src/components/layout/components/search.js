import MMMInput from "components/input";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchInput from "./search-input";
import SearchIconImage from "../../../images/icon/search.png";

const Search = () => {
  const navigate = useNavigate();

  // searchPage 이동 함수
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.product.value;
    navigate(`products/search/${inputValue}`);
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

// 원래 inputBox 코드.. (input을 또 만들어야할 거 같음..)
// const InputBox = styled.div
//   ${({ size }) => sizeCSS[size]}
//   ${flexCenter};
//   position: relative;
//   margin-bottom: 16px;
//   border: none;
//   margin: 0px;
//   outline: none;
//   padding: 0 50px 0 20px;
//   color: #757575;
//   & input {
//     width: 100%;
//     border-radius: 5px;
//     height: 100%;
//     text-align: center;

//   }
// ;
const S = {
  SearchIcon,
  Wrapper,
  SearchBtn,
};
