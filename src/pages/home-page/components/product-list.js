import styled from "styled-components";
import OneProduct from "components/one-product";
import { useQuery } from "react-query";
import { worker } from "__mock__/browser";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router";
import { Container, Grid } from "@mui/material";
import MMMButton from "components/button";
import { useSetRecoilState } from "recoil";
import { mswDataTest } from "store";
import { useEffect } from "react";

const ProductList = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  const navigate = useNavigate();

  const navigate = useNavigate();


  // 중고 목록 데이터를 리코일에 저장
  const setUsed = useSetRecoilState(mswDataTest);

  useEffect(() => {
    setUsed(UsedProductList);
  }, [UsedProductList]);

  const { data: FreeProductList } = useQuery(
    [PRODUCT_QUERY_KEY.FREE_PRODUCT_LIST],
    () => Api.getFreeProduct()
  );


  const onClickMoreBtn = (saleStatus) => {
    navigate(`/products/${saleStatus}`);
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
            {UsedProductList[0].slice(0, 8).map((item, index) => (
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
                  content={item.content}
                  img={item.Product_img}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.id}
                />
              </Grid>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("sell")}
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
            {FreeProductList[0].slice(0, 8).map((item, index) => (
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
                  content={item.content}
                  img={item.Product_img}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.id}
                />
              </Grid>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("free")}
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

const UsedTrade = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  padding: 30px 0;
  left: 0;
`;

const Share = styled.div``;

const S = {
  UsedTrade,
  Title,
  Share,
};

