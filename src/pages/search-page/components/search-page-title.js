import styled from "styled-components";

const SearchPageTitle = ({ totalProductsCount, searchValue }) => {
  return (
    <>
      <S.Title>
        <S.SearchValue>{searchValue}</S.SearchValue> 의 검색결과 입니다
      </S.Title>
      <S.CountDiv>총 {totalProductsCount}건</S.CountDiv>
    </>
  );
};

export default SearchPageTitle;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.font};
`;

const SearchValue = styled.span`
  color: ${({ theme }) => theme.COLORS.primary.blue};
`;

const CountDiv = styled.div`
  line-height: 50px;
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  color: ${({ theme }) => theme.COLORS.gray[500]};
`;

const S = {
  Title,
  CountDiv,
  SearchValue,
};
