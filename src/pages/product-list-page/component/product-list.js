import { Api } from "apis";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "consts";
import { flexCenter } from "styles/common.style";
import styled from "styled-components";
import ProductPageTitle from "./product-page-title";
import OneProduct from "components/one-product";
import { worker } from "__mock__/browser";
import { Container, Grid } from "@mui/material";

const ProductList = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }
  const params = useParams();
  const saleStatus = params.saleStatus;

  // 첫 번째 인자: QueryKey / 두 번째 인자: 비동기함수(api호출함수)
  const { data: productList } = useInfiniteQuery(
    [PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST, saleStatus],
    () => Api.getUsedOrFreeProduct(saleStatus)
  );

  return (
    productList && (
      <>
        <S.TitleWrapper>
          <ProductPageTitle
            totalProductsCount={productList.pages[0][0].length}
          />
        </S.TitleWrapper>
        <hr />
        <Container style={{ marginTop: 100 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {productList.pages[0][0].map((product, index) => (
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
        <S.MoreBtn>More</S.MoreBtn>
      </>
    )
  );
};

export default ProductList;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1165px;
  margin: 0 auto;
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
};
