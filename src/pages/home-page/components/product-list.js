import styled from "styled-components";
import OneProduct from "components/one-product";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { useNavigate } from "react-router";
import { Container, Grid } from "@mui/material";
import MMMButton from "components/button";

const ProductList = () => {
  const navigate = useNavigate();

  const { data: productList } = useQuery(
    [PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST],
    () => Api.getMainProductList()
  );

  const UsedProductList = productList && productList.usedProduct;
  const FreeProductList = productList && productList.freeProduct;

  const onClickMoreBtn = (saleStatus) => {
    navigate(`/MMM/products/${saleStatus}`);
  };

  return (
    UsedProductList &&
    FreeProductList && (
      <Container>
        <S.UsedTrade>
          <S.Title>중고거래</S.Title>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {UsedProductList.slice(0, 8).map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                lg={3}
                style={{ paddingBottom: 40 }}
              >
                <OneProduct
                  title={item.title}
                  img={item.img_url}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.idx}
                  status={item.status}
                  createdAt={item.createdAt}
                />
              </Grid>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("0")}
            variant={"More"}
            style={{ border: "1px solid #9F9EB3" }}
          >
            MORE
          </MMMButton>
        </S.UsedTrade>
        <S.Share>
          <Title>무료나눔</Title>

          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {FreeProductList.slice(0, 8).map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                lg={3}
                style={{ paddingBottom: 40 }}
              >
                <OneProduct
                  title={item.title}
                  img={item.img_url}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.idx}
                  createdAt={item.createdAt}
                  status={item.status}
                  likeCount={item.likeCount}
                />
              </Grid>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("1")}
            variant={"More"}
            style={{ border: "1px solid #9F9EB3" }}
          >
            MORE
          </MMMButton>
        </S.Share>
      </Container>
    )
  );
};

export default ProductList;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  padding: 30px 0;
  left: 0;
`;

const Share = styled.div``;

const UsedTrade = styled.div`
  margin-bottom: 50px;
`;

const S = {
  UsedTrade,
  Title,
  Share,
};
