import { UsePriceComma } from "hooks/use-price-comma";
import { styled } from "styled-components";

const PriceBox = ({ title, price, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <span>{title}</span>
      <p>{UsePriceComma(price)}</p>
    </Wrapper>
  );
};
export default PriceBox;

const Wrapper = styled.div`
  width: 290px;
  border-right: 1px solid #c1c1c1;

  text-align: center;
  & > span {
    font-size: 20px;
    color: #000;
  }
  & > p {
    font-size: 32px;
    padding-top: 20px;
  }
  & > :last-child {
    border: none;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100px;
    & > span {
      font-size: 18px;
      color: #000;
    }
    & > p {
      font-size: 24px;
      padding-top: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 220px;
    & > span {
      font-size: 20px;
      color: #000;
    }
    & > p {
      font-size: 32px;
    }
  }
`;
