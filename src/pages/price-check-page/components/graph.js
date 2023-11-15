import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import PriceBox from "./price-box";
import GraphItem from "./graphItem";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";

const PriceGraph = () => {
  const today = new Date();
  const aWeekAgo = new Date(today);
  const twoWeekAgo = new Date(today);
  const threeWeekAgo = new Date(today);
  const fourWeekAgo = new Date(today);
  aWeekAgo.setMonth(today.getMonth() - 1);
  twoWeekAgo.setMonth(today.getMonth() - 2);
  threeWeekAgo.setMonth(today.getMonth() - 3);
  fourWeekAgo.setMonth(today.getMonth() - 4);

  const { data: AllProductList } = useQuery(
    [PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST],
    () => Api.getAllProduct()
  );

  const aWeekAgoArr =
    AllProductList &&
    AllProductList.usedProduct.filter(
      (item) => item.createdAt > aWeekAgo.toJSON()
    );
  const twoWeekAgoArr =
    AllProductList &&
    AllProductList.usedProduct.filter(
      (item) =>
        aWeekAgo.toJSON() > item.createdAt &&
        item.createdAt > twoWeekAgo.toJSON()
    );
  const threeWeekAgoArr =
    AllProductList &&
    AllProductList.usedProduct.filter(
      (item) =>
        twoWeekAgo.toJSON() > item.createdAt &&
        item.createdAt > threeWeekAgo.toJSON()
    );
  const fourWeekAgoArr =
    AllProductList &&
    AllProductList.usedProduct.filter(
      (item) =>
        threeWeekAgo.toJSON() > item.createdAt &&
        item.createdAt > fourWeekAgo.toJSON()
    );

  // 최고 시세
  const MAXARR =
    AllProductList &&
    AllProductList.usedProduct.reduce((prev, value) => {
      return prev.price >= value.price ? prev : value;
    });

  // 최저 시세
  const MINARR =
    AllProductList &&
    AllProductList.usedProduct.reduce((prev, value) => {
      return prev.price >= value.price ? value : prev;
    });

  // 평균 시세
  const result =
    AllProductList &&
    AllProductList.usedProduct.reduce((prev, value) => {
      return prev + value.price;
    }, 0);

  const AVGARR =
    result && Math.floor(result / AllProductList.usedProduct.length);

  console.log(result, AVGARR);

  //문제 배열안에서 가장 큰 값을 찾는 수식을 짜라 price가 가장 높은 애를 찾아라

  return (
    <Wrapper>
      <PriceBoxWrapper>
        <PriceBox
          title={"최고"}
          price={MAXARR.price}
          style={{ color: "#DF0000" }}
        />
        <PriceBox title={"시세"} price={AVGARR} style={{ color: "#2EB200" }} />
        <PriceBox
          title={"최저"}
          price={MINARR.price}
          style={{ border: "none", color: "#062BED" }}
        />
      </PriceBoxWrapper>
      {/* <p>최근 3 달간 안주현의 시세입니다. </p> */}
      {/* 그래프 미디어 쿼리 : display로 특정 사이즈마다 사라졌다가 보이게 하는 기능 */}
      <MainGraph>
        <GraphItem data={2} width={460} height={300} />
      </MainGraph>
      <MediaGraph>
        <GraphItem data={2} width={333} height={218} fontsize={12}></GraphItem>
      </MediaGraph>
    </Wrapper>
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
