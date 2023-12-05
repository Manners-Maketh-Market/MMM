import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const OneProduct = ({ data }) => {
  return (
    <Product>
      <Thumbnail />
      <Title></Title>
      <Price></Price>
    </Product>
  );
};
export default OneProduct;

const Product = styled.div`
  ${flexCenter}
  flex-direction: row;
`;
const Thumbnail = styled.div`
  background-color: aliceblue;
`;
const Title = styled.h3``;
const Price = styled.h3``;
