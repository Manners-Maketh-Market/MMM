import styled from "styled-components";
import { Grid, GridItem } from "@chakra-ui/react";
import OneProduct from "components/one-product";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router";
import MMMButton from "components/button";
import { useSetRecoilState } from "recoil";
import { mswDataSell, mswDataFree } from "store";
import { useEffect } from "react";

const ProductList = () => {
  const navigate = useNavigate();

  const { data: UsedProductList } = useQuery(
    [PRODUCT_QUERY_KEY.USED_PRODUCT_LIST],
    () => Api.getUsedProduct()
  );

  // 중고 목록 데이터를 리코일에 저장
  const setUsed = useSetRecoilState(mswDataSell);
  const setFree = useSetRecoilState(mswDataFree);

  useEffect(() => {
    setUsed(UsedProductList);
    setFree(FreeProductList);
  }, []);

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
      <Wrapper>
        <UsedTrade>
          <Title>중고거래</Title>

          <Grid
            className="Grid"
            templateColumns="repeat(4, 1fr)"
            gap={50}
            gridColumnGap={15}
            cursor={"pointer"}
          >
            {UsedProductList[0].slice(0, 8).map((item, idx) => (
              <GridItem className="GridItem" w="280px" h="" key={idx}>
                <OneProduct
                  title={item.title}
                  content={item.content}
                  img={item.Product_img}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.id}
                />
              </GridItem>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("sell")}
            variant={"More"}
            style={{ border: "1px solid #9F9EB3" }}
          >
            MORE
          </MMMButton>
        </UsedTrade>
        <Share>
          <Title>무료나눔</Title>
          <Grid
            className="Grid"
            templateColumns="repeat(4, 1fr)"
            gap={50}
            gridColumnGap={15}
            cursor={"pointer"}
          >
            {FreeProductList[0].slice(0, 8).map((item, idx) => (
              <GridItem className="GridItem" w="280px" h="" key={idx}>
                <OneProduct
                  title={item.title}
                  content={item.content}
                  img={item.Product_img}
                  price={item.price}
                  isLiked={item.isLiked}
                  id={item.id}
                />
              </GridItem>
            ))}
          </Grid>
          <MMMButton
            onClick={() => onClickMoreBtn("free")}
            variant={"More"}
            style={{ border: "1px solid #9F9EB3" }}
          >
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
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
    margin: 0 auto 40px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 100%;
    margin: 0 auto 40px;
    padding: 10px;
  }
`;

const UsedTrade = styled.div`
  margin-bottom: 50px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    & > .Grid {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 0;
    }

    * .GridItem {
      width: 200px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    & > .Grid {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 15;
    }

    * .GridItem {
      width: 100%;
    }
    .GridItem:nth-of-type(1n + 7) {
      display: none;
    }
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  padding: 30px 20px;
  left: 0;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    font-size: 20px;
  }
`;

const Share = styled.div`
  @media ${({ theme }) => theme.DEVICE.mobile} {
    & > .Grid {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 0;
    }

    * .GridItem {
      width: 200px;
    }
  }

  @media ${({ theme }) => theme.DEVICE.tablet} {
    & > .Grid {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 15;
    }

    * .GridItem {
      width: 100%;
    }
    .GridItem:nth-of-type(1n + 7) {
      display: none;
    }
  }
`;

/*
  @media ${({ theme }) => theme.DEVICE.mobile} {
    & > img {
      display: none;
    }
  }
*/
