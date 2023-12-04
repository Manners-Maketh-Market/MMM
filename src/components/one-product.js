import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import HeartIcon from "../images/icon/fullheart.png";
import emptyHeartIcon from "../images/icon/emptyHeart.png";

const OneProduct = ({ title, status, img, price, id, createdAt }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const onClickToDetailPage = (id) => {
    navigate(`/MMM/products/detail/${id}`);
    window.scrollTo({ top: 0 });
  };

  const onToggleIsLiked = () => {
    setIsLiked((prev) => !prev);
  };

  const ProductRegistrationTime = (productRegistrationCreatedAt) => {
    let currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    let currentMonth = currentTime.getMonth() + 1;
    let currentDate = currentTime.getDate();
    let currentHours = currentTime.getHours();

    const productRegistrationTime = new Date(productRegistrationCreatedAt);
    const productRegistrationYear = productRegistrationTime.getFullYear();
    const productRegistrationMonth = productRegistrationTime.getMonth() + 1;
    const productRegistrationDate = productRegistrationTime.getDate();
    const productRegistrationHours = productRegistrationTime.getHours();

    if (productRegistrationYear < currentYear) {
      return `${currentYear - productRegistrationYear}년전`;
    } else if (productRegistrationMonth < currentMonth) {
      return `${currentMonth - productRegistrationMonth}개월 전`;
    } else if (productRegistrationDate < currentDate) {
      return `${currentDate - productRegistrationMonth}일 전`;
    } else if (productRegistrationHours < currentHours) {
      return `${currentHours - productRegistrationHours}시간 전`;
    }
  };

  return (
    <S.Wrapper>
      {status === "판매중" ? (
        <S.ProductImg
          src={img}
          alt="product img"
          onClick={() => onClickToDetailPage(id)}
        />
      ) : (
        <>
          <S.SoldOutProductImg
            src={img}
            alt="product img"
            onClick={() => onClickToDetailPage(id)}
          />
          <S.SoldOutMessage>Sold Out</S.SoldOutMessage>
        </>
      )}
      <S.TitleAndLikeBox>
        <S.Title className="Title">{title}</S.Title>

        {isLiked ? (
          <S.HeartImg src={HeartIcon} alt="heart" onClick={onToggleIsLiked} />
        ) : (
          <S.HeartImg
            src={emptyHeartIcon}
            alt="emptyHeart"
            onClick={onToggleIsLiked}
          />
        )}
      </S.TitleAndLikeBox>
      <S.Content className="Content">
        {ProductRegistrationTime(createdAt)}
      </S.Content>
      <S.Price className="Price">{price}원</S.Price>
    </S.Wrapper>
  );
};

export default OneProduct;

const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  position: relative;
  @media screen and (min-width: 1023px) {
    width: 290px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 3px 3px ${({ theme }) => theme.COLORS.gray[100]};
    transform: translateY(-8px);
    transition: all ease 0.2s;
    border-radius: 10px;
  }

  .content {
    @media ${({ theme }) => theme.DEVICE.mobile} {
      width: 50%;
    }
    @media ${({ theme }) => theme.DEVICE.tablet} {
      width: 50%;
    }
  }
`;

const ProductImg = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 16px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
    height: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
    height: 90%;
  }
`;

const SoldOutProductImg = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 16px;
  filter: contrast(15%);

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
    height: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
    height: 90%;
  }
`;

const SoldOutMessage = styled.div`
  position: absolute;
  top: 125px;
  font-size: ${({ theme }) => theme.FONT_SIZE["extraLarge"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["bold"]};
  color: ${({ theme }) => theme.COLORS["white"]};
`;

const TitleAndLikeBox = styled.div`
  padding: 10px 0 10px 0;
  width: 280px;
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  width: 200px;
  height: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  overflow: hidden;
  padding-bottom: px;
`;

const HeartImg = styled.img`
  width: 20px;
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

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
  }
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  width: 280px;
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 30px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
  }
`;

const S = {
  Wrapper,
  ProductImg,
  TitleAndLikeBox,
  Content,
  Price,
  Title,
  HeartImg,
  SoldOutProductImg,
  SoldOutMessage,
};
