import { Api } from "apis";
import OneProduct from "components/one-product";
import { PRODUCT_QUERY_KEY } from "consts";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Grid } from "@mui/material";
import NoResultPage from "./no-result-page";
import SearchPageTitle from "./search-page-title";
import MMMButton from "components/button";

const SearchProductList = () => {
  const { searchValue } = useParams();

  const { data: searchUsedProducts, fetchNextPage } = useInfiniteQuery(
    [PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST, searchValue],
    ({ pageParam = 1 }) => Api.getSearchProduct(0, searchValue, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return (
          lastPage.pagination.curPage < lastPage.pagination.totalPage &&
          lastPage.pagination.curPage + 1
        );
      },
    }
  );
  searchUsedProducts && console.log(searchUsedProducts);

  return (
    searchUsedProducts && (
      <S.Wrapper>
        {searchUsedProducts.pages[0].product.length === 0 ||
        searchValue === 194191464161616511 ? (
          <NoResultPage />
        ) : (
          <>
            <S.TitleWrapper>
              <SearchPageTitle
                totalProductsCount={
                  searchUsedProducts.pages[0].pagination.count
                }
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
            {searchUsedProducts.pages?.map((page) => (
              <>
                {page.product?.map((product, index) => (
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
                      img={product.img_url}
                      price={product.price}
                      isLiked={product.isLiked}
                      status={product.status}
                      likeCount={product.likeCount}
                      id={product.id}
                    />
                  </Grid>
                ))}
              </>
            ))}
          </Grid>
        </Container>
        {/* 더 이상 불러올 상품이 없다면 MORE 버튼 안보이게 하는 조건 */}
        {searchUsedProducts.pages[0].product.length && (
          <>
            {!(
              searchUsedProducts.pages.at(-1).pagination.curPage ===
              searchUsedProducts.pages[0].pagination.endPage
            ) && (
              <MMMButton
                variant={"More"}
                style={{ border: "1px solid #9F9EB3" }}
                onClick={() => fetchNextPage()}
              >
                More
              </MMMButton>
            )}
          </>
        )}
      </S.Wrapper>
    )
  );
};
export default SearchProductList;

const Wrapper = styled.div`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 80px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1165px;
  margin: 0 auto;
  padding-top: 36px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 32px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 32px;
  }
`;

const S = {
  TitleWrapper,
  Wrapper,
};
