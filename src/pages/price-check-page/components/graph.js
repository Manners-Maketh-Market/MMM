import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const PriceGraph = () => {
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
    {},
  ];

  return (
    <Wrapper>
      <p>최근 3 달간 안주현의 시세입니다. </p>
      <ResponsiveContainer width={666} height={436}>
        <LineChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#5550bd"
            strokeWidth={1}
            tickLine={false}
            dy={10}
          />
          <YAxis stroke="#5550bd" strokeWidth={1} tickLine={false} />
          <Line
            type="bump"
            dataKey={"Price"}
            activeDot={{ r: 8 }}
            stroke="#282190"
            strokeWidth={3}
          />
          {/*11월 14일 주현 생일 */}
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" opacity={0.8} vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};
export default PriceGraph;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin: 100px;
`;
