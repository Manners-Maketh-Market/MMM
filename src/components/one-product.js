import { useNavigate } from "react-router";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const OneProduct = ({ title, content, img, price, isLiked, id }) => {
  const navigate = useNavigate();

  const onClickToDetailPage = (id) => {
    navigate(`/products/detail/${id}`);
  };

  return (
    <S.Wrapper onClick={() => onClickToDetailPage(id)}>
      <S.ProductImg src={img[0]} alt="product img" />
      <S.TitleAndLikeBox>
        <S.Title>{title}</S.Title>
        <div>isLiked</div>
      </S.TitleAndLikeBox>
      <S.Content>{content}</S.Content>
      <S.Price>{price}원</S.Price>
    </S.Wrapper>
  );
};

export default OneProduct;

const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const ProductImg = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 16px;
`;

const TitleAndLikeBox = styled.div`
  padding: 10px 0 10px 0;
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  width: 37px;
  height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  overflow: hidden;
  padding-bottom: px;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.gray[400]};
  padding-top: 5px;
  width: 280px;
  height: 65px;
  line-height: 1.2;
  display: flex;
  justify-content: flex-start;
  height: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  width: 280px;
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
`;

const S = {
  Wrapper,
  ProductImg,
  TitleAndLikeBox,
  Content,
  Price,
  Title,
};
