import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import PriceBox from "./price-box";
import GraphItem from "./graphItem";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PriceGraph = () => {
  const today = new Date();
  const aWeekAgo = new Date(today);
  aWeekAgo.setDate(today.getDate() - 4);
  // 5일간의 시세를 구하기 위한 오늘 날짜와 4일전 날짜

  const [graphKeyWord, setGraphKeyWord] = useState("");
  const param = useParams();
  const datatitle = param.title;

  const { data: ProductPriceList } = useQuery(
    [PRODUCT_QUERY_KEY.PRODUCT_PRICE_DATA],
    () =>
      Api.getProductPrice(
        "",
        aWeekAgo.toJSON().substr(0, 10),
        today.toJSON().substr(0, 10)
      )
  );

  ProductPriceList && console.log(ProductPriceList, datatitle);

  // useEffect(() => {
  //   if (datatitle) {
  //     setGraphKeyWord(datatitle);
  //   }
  // }, [datatitle]);

  // 월일만 출력하기 위해서 자름
  const sliceAvgPrice =
    ProductPriceList &&
    ProductPriceList.cumulativeAvgPrice.map((list) => {
      return { date: list.date.substring(5), avgPrice: list.avgPrice };
    });

  // 최고 시세
  const MAXARR =
    ProductPriceList &&
    ProductPriceList.products.product.reduce((prev, value) => {
      return prev.price >= value.price ? prev : value;
    });

  // 최저 시세
  const MINARR =
    ProductPriceList &&
    ProductPriceList.products.product.reduce((prev, value) => {
      return prev.price >= value.price ? value : prev;
    });

  // 평균 시세
  const result =
    ProductPriceList &&
    ProductPriceList.products.product.reduce((prev, value) => {
      return prev + value.price;
    }, 0);

  const AVGARR =
    result && Math.floor(result / ProductPriceList.products.product.length);

  //문제 배열안에서 가장 큰 값을 찾는 수식을 짜라 price가 가장 높은 애를 찾아라

  return (
    MINARR &&
    MAXARR &&
    AVGARR && (
      <Wrapper>
        <PriceBoxWrapper>
          <PriceBox
            title={"최고"}
            price={MAXARR.price}
            style={{ color: "#DF0000" }}
          />
          <PriceBox
            title={"시세"}
            price={AVGARR}
            style={{ color: "#2EB200" }}
          />
          <PriceBox
            title={"최저"}
            price={MINARR.price}
            style={{ border: "none", color: "#062BED" }}
          />
        </PriceBoxWrapper>
        {/* <p>최근 3 달간 안주현의 시세입니다. </p> */}
        {/* 그래프 미디어 쿼리 : display로 특정 사이즈마다 사라졌다가 보이게 하는 기능 */}
        <MainGraph>
          <GraphItem data={sliceAvgPrice} width={460} height={300} />
        </MainGraph>
        <MediaGraph>
          <GraphItem
            data={sliceAvgPrice}
            width={333}
            height={218}
            fontsize={12}
          ></GraphItem>
        </MediaGraph>
      </Wrapper>
    )
  );
};
export default PriceGraph;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  // margin: 50px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin: 0 auto 50px;
  }

  @media ${({ theme }) => theme.DEVICE.tablet} {
    margin: 30px auto 40px;
  }
`;

const PriceBoxWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin-bottom: 40px;
    margin-top: 10px;
  }
`;

const MainGraph = styled.div`
  padding-right: 50px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: none;
  }
`;
const MediaGraph = styled.div`
  padding-right: 30px;
  display: none;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: block;
  }
`;
