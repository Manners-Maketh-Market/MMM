import { useParams } from "react-router-dom";
import styled from "styled-components";

const ProductPageTitle = ({ totalProductsCount }) => {
  const params = useParams();
  const productPageTitle = params.saleStatus;

  return (
    // saleStatus에 따라서 중고거래와 무료나눔으로 바꿈
    <S.TitleContainer>
      {productPageTitle === "0" ? (
        <S.Title>중고거래</S.Title>
      ) : (
        <S.Title>무료나눔</S.Title>
      )}
      <S.CountDiv>총 {totalProductsCount}건</S.CountDiv>
    </S.TitleContainer>
  );
};

export default ProductPageTitle;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 32px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 32px;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraLarge};
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.font};
`;

const CountDiv = styled.div`
  line-height: 50px;
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  color: ${({ theme }) => theme.COLORS.gray[500]};
`;

const S = {
  Title,
  TitleContainer,
  CountDiv,
};
