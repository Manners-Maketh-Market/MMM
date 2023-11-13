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
  aWeekAgo.setDate(today.getDate() - 7);
  twoWeekAgo.setDate(today.getDate() - 14);
  threeWeekAgo.setDate(today.getDate() - 21);
  fourWeekAgo.setDate(today.getDate() - 28);

  const { data: UsedProductList } = useQuery(
    [PRODUCT_QUERY_KEY.FREE_PRODUCT_LIST],
    () => Api.getUsedProduct()
  );

  const aWeekAgoArr = UsedProductList[0].filter(
    (item) => item.createdAt > aWeekAgo.toJSON()
  );
  const twoWeekAgoArr = UsedProductList[0].filter(
    (item) =>
      aWeekAgo.toJSON() > item.createdAt && item.createdAt > twoWeekAgo.toJSON()
  );
  const threeWeekAgoArr = UsedProductList[0].filter(
    (item) =>
      twoWeekAgo.toJSON() > item.createdAt &&
      item.createdAt > threeWeekAgo.toJSON()
  );
  const fourWeekAgoArr = UsedProductList[0].filter(
    (item) =>
      threeWeekAgo.toJSON() > item.createdAt &&
      item.createdAt > fourWeekAgo.toJSON()
  );

  console.log(aWeekAgoArr, twoWeekAgoArr, threeWeekAgoArr, fourWeekAgoArr);

  const data = [
    { Price: 3000 },
    {
      name: "3개월 전",
      Price: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2개월 전",
      Price: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "1개월 전",
      Price: 9000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "오늘",
      Price: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  return (
    <Wrapper>
      <PriceBoxWrapper>
        <PriceBox
          title={"최고"}
          price={data[3].Price}
          style={{ color: "#DF0000" }}
        />
        <PriceBox title={"시세"} price={4455} style={{ color: "#2EB200" }} />
        <PriceBox
          title={"최저"}
          price={data[4].Price}
          style={{ border: "none", color: "#062BED" }}
        />
      </PriceBoxWrapper>
      {/* <p>최근 3 달간 안주현의 시세입니다. </p> */}
      {/* 그래프 미디어 쿼리 : display로 특정 사이즈마다 사라졌다가 보이게 하는 기능 */}
      <MainGraph>
        <GraphItem data={data} width={460} height={300} />
      </MainGraph>
      <MediaGraph>
        <GraphItem
          data={data}
          width={333}
          height={218}
          fontsize={12}
        ></GraphItem>
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
