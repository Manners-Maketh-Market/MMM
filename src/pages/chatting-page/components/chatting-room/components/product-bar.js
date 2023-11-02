import { MockProductsData } from "__mock__/faker-data";
import styled from "styled-components";

const ProductBar = () => {
  const MockUserData = MockProductsData(1);

  console.log(MockUserData);

  return (
    <S.Wrapper>
      <S.ProductImg src={MockUserData[0].Product_img[0]} />
      <S.PriceAndTitle>
        <S.Price>{MockUserData[0].price}원</S.Price>
        <S.ProductTitle>{MockUserData[0].title}</S.ProductTitle>
      </S.PriceAndTitle>
    </S.Wrapper>
  );
};

export default ProductBar;

const Wrapper = styled.div`
  display: flex;
  width: 732px;
  height: 100px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
  margin: 20px;
`;

const PriceAndTitle = styled.div`
  flex-direction: column;
`;

const Price = styled.p`
  margin-bottom: 10px;
`;

const ProductTitle = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  color: ${({ theme }) => theme.COLORS.gray[500]};
`;

const S = {
  Wrapper,
  ProductImg,
  Price,
  ProductTitle,
  PriceAndTitle,
};
