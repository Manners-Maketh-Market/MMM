import { Grid, GridItem } from "@chakra-ui/react";
import { worker } from "__mock__/browser";
import { Api } from "apis";
import OneProduct from "components/one-product";
import { PRODUCT_QUERY_KEY } from "consts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SearchPageTitle from "./search-page-title";
import NoResultPage from "./no-result-page";

const SearchProductList = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  const params = useParams();
  const searchValue = params.searchValue;

  const { data: searchProducts } = useQuery(
    [PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST, searchValue],
    () => Api.getSearchProduct(searchValue)
  );

  searchProducts && console.log(searchProducts);

  return (
    searchProducts && (
      <>
        {searchProducts[0].length === 0 ? (
          <NoResultPage />
        ) : (
          <>
            <S.TitleWrapper>
              <SearchPageTitle
                totalProductsCount={searchProducts[0].length}
                searchValue={searchValue}
              />
            </S.TitleWrapper>
            <hr />
          </>
        )}

        <S.Wrapper>
          <Grid templateColumns="repeat(4, 1fr)" gap={50} gridColumnGap={15}>
            {searchProducts[0].map((product) => (
              <GridItem w="280" h="">
                <OneProduct
                  title={product.title}
                  content={product.content}
                  img={product.Product_img}
                  price={product.price}
                  isLiked={product.isLiked}
                />
              </GridItem>
            ))}
          </Grid>
        </S.Wrapper>
      </>
    )
  );
};
export default SearchProductList;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1165px;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  ${flexCenter};
  display: grid;
  width: 100%;
  margin-top: 80px;
`;

const S = {
  Wrapper,
  TitleWrapper,
};
