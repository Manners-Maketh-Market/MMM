import { worker } from "__mock__/browser";
import { Api } from "apis";
import OneProduct from "components/one-product";
import { PRODUCT_QUERY_KEY } from "consts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchPageTitle from "./search-page-title";
import NoResultPage from "./no-result-page";
import { Container, Grid } from "@mui/material";

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

  return (
    searchProducts && (
      <>
        {searchProducts[0].length === 0 ||
        searchValue === 194191464161616511 ? (
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

        <Container style={{ marginTop: 100 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {searchProducts[0].map((product, index) => (
              <Grid
                key={index}
                product
                xs={12}
                md={4}
                lg={3}
                style={{ paddingBottom: 40 }}
              >
                <OneProduct
                  title={product.title}
                  content={product.content}
                  img={product.Product_img}
                  price={product.price}
                  isLiked={product.isLiked}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
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
  @media ${({ theme }) => theme.DEVICE.mobile} {
    justify-content: flex-start;
    flex-direction: column;
    width: 767px;
    margin-left: 32px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    width: 1023px;
    margin-left: 32px;
  }
`;

const S = {
  TitleWrapper,
};
