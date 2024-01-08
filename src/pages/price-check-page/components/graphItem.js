import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GraphItem = ({ data, width, height, fontsize }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <XAxis
          dataKey={"date"}
          stroke="#5550bd"
          strokeWidth={1}
          tickLine={false}
          dy={10}
          fontSize={fontsize}
        />
        <YAxis
          stroke="#5550bd"
          strokeWidth={1}
          tickLine={false}
          fontSize={fontsize}
        />
        <Line
          type="bump"
          dataKey={"avgPrice"}
          activeDot={{ r: 8 }}
          stroke="#282190"
          strokeWidth={3}
        />
        {/*11월 14일 주현 생일 */}
        <Tooltip />
        <CartesianGrid stroke="#e0dfdf" opacity={0.8} vertical={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphItem;
