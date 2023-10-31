import MMMInput from "components/input";
import styled from "styled-components";

const SearchInput = () => {
  return (
    <S.Wrapper>
      <MMMInput size={"search"} placeholder="Search" />
      <S.SearchIcon src="assets/icon/search.png" width={24} />
    </S.Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.form`
  position: relative;
  display: flex;
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 7px;
  right: 12px;
`;

const S = {
  SearchIcon,
  Wrapper,
};
