import styled from "styled-components";
import { flexAlignCenter } from "styles/common.style";

const Product = ({ title, price, img }) => {
  return (
    <OneProduct>
      <Thumbnail src={img} />
      <Title>{title}</Title>
      <Price>{price}원</Price>
    </OneProduct>
  );
};
export default Product;

const OneProduct = styled.div`
  width: 100%;
  ${flexAlignCenter}
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 40px 20px;
  border-bottom: 1px solid #e5e5e5;
`;
const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: aliceblue;
`;
const Title = styled.h3`
  width: 600px;
`;
const Price = styled.h3``;
