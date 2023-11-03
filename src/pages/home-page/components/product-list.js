import styled from "styled-components";
import { Grid, GridItem } from "@chakra-ui/react";
import OneProduct from "components/one-product";
import { useQuery } from "react-query";
import { worker } from "__mock__/browser";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router";
import MMMButton from "components/button";

const ProductList = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }

  const navigate = useNavigate();

  const { data: UsedProductList } = useQuery([PRODUCT_QUERY_KEY.USED_PRODUCT_LIST], () => Api.getUsedProduct());

  const { data: FreeProductList } = useQuery([PRODUCT_QUERY_KEY.FREE_PRODUCT_LIST], () => Api.getFreeProduct());

  const onClickMoreBtn = (saleStatus) => {
    navigate(`/products/${saleStatus}`);
  };

  return (
    UsedProductList &&
    FreeProductList && (
      <Wrapper>
        <UsedTrade>
          <Title>중고거래</Title>
          <Grid templateColumns="repeat(4, 1fr)" gap={50} gridColumnGap={15} cursor={"pointer"}>
            {UsedProductList[0].slice(0, 8).map((item, idx) => (
              <GridItem w="280px" h="" key={idx}>
                <OneProduct title={item.title} content={item.content} img={item.Product_img} price={item.price} isLiked={item.isLiked} id={item.id} />
              </GridItem>
            ))}
          </Grid>
          <MMMButton onClick={() => onClickMoreBtn("sell")} variant={"More"} style={{ border: "1px solid #9F9EB3" }}>
            MORE
          </MMMButton>
        </UsedTrade>
        <Share>
          <Title>무료나눔</Title>
          <Grid templateColumns="repeat(4, 1fr)" gap={50} gridColumnGap={15} cursor={"pointer"}>
            {FreeProductList[0].slice(0, 8).map((item, idx) => (
              <GridItem w="280px" h="" key={idx}>
                <OneProduct title={item.title} content={item.content} img={item.Product_img} price={item.price} isLiked={item.isLiked} />
              </GridItem>
            ))}
          </Grid>
          <MMMButton onClick={() => onClickMoreBtn("free")} variant={"More"} style={{ border: "1px solid #9F9EB3" }}>
            MORE
          </MMMButton>
        </Share>
      </Wrapper>
    )
  );
};

export default ProductList;

const Wrapper = styled.div`
  flex-direction: column;
  ${flexCenter}
  width: 1280px;
  margin: 70px auto;
`;

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
