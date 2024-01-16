import { Api } from "apis";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "consts";
import { flexCenter } from "styles/common.style";
import styled from "styled-components";
import ProductPageTitle from "./product-page-title";
import OneProduct from "components/one-product";
import { Container, Grid } from "@mui/material";
import MMMButton from "components/button";

const ProductList = () => {
  const { saleStatus } = useParams();

  const {
    data: productList,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST, saleStatus],
    ({ pageParam = 1 }) => Api.getUsedOrFreeProduct(pageParam, saleStatus),
    {
      getNextPageParam: (lastPage) => {
        return (
          lastPage.pagination.curPage < lastPage.pagination.totalPage &&
          lastPage.pagination.curPage + 1
        );
      },
    }
  );

  return (
    productList && (
      <S.Wrapper>
        <S.TitleWrapper>
          <ProductPageTitle
            totalProductsCount={productList.pages[0].pagination.count}
          />
        </S.TitleWrapper>
        <hr />
        <Container style={{ marginTop: 100 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {productList.pages?.map((page) => (
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
                      id={product.idx}
                      status={product.status}
                      createdAt={product.createdAt}
                      liked={product.liked}
                      refetch={refetch}
                    />
                  </Grid>
                ))}
              </>
            ))}
          </Grid>
        </Container>
        {/* 더 이상 불러올 상품이 없다면 MORE 버튼 안보이게 하는 조건 */}
        {!(
          productList.pages.at(-1).pagination.curPage ===
          productList.pages[0].pagination.endPage
        ) && (
          <MMMButton
            variant={"More"}
            style={{ border: "1px solid #9F9EB3" }}
            onClick={() => fetchNextPage()}
          >
            More
          </MMMButton>
        )}
      </S.Wrapper>
    )
  );
};

export default ProductList;

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
`;

const MoreBtn = styled.button`
  ${flexCenter};
  width: fit-content;
  margin: 0 auto;
  color: rgba(16, 13, 69, 0.7); //#100d45
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  border: 1px solid rgba(16, 13, 69, 0.7);
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 28px;
  margin: 50px auto;
`;

const S = {
  TitleWrapper,
  MoreBtn,
  Wrapper,
};
