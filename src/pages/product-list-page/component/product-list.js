import { Api } from "apis";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "consts";
import { flexCenter } from "styles/common.style";
import styled from "styled-components";
import ProductPageTitle from "./product-page-title";
import OneProduct from "components/one-product";
import { Container, Grid } from "@mui/material";

const ProductList = () => {
  const { saleStatus } = useParams();

  const { data: productList } = useQuery([PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST, saleStatus], () => Api.getAllProduct());

  let currentProductList = null;

  if (productList) {
    currentProductList = saleStatus === "sell" ? productList.usedProduct : productList.freeProduct;
  }

  return (
    currentProductList && (
      <S.Wrapper>
        <S.TitleWrapper>
          <ProductPageTitle totalProductsCount={currentProductList.length} />
        </S.TitleWrapper>
        <hr />
        <Container style={{ marginTop: 100 }}>
          <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} style={{ paddingBottom: 20 }}>
            {currentProductList.map((product, index) => (
              <Grid key={index} product xs={12} md={4} lg={3} style={{ paddingBottom: 40 }}>
                <OneProduct title={product.title} status={product.status} img={product.img_url} price={product.price} isLiked={product.isLiked} id={product.id} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <S.MoreBtn>More</S.MoreBtn>
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
