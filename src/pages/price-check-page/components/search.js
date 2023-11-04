import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const PriceSearch = () => {
  return (
    <Wrapper>
      <Title>시세조회</Title>
      <Text>원하시는 상품이 얼마에 거래되고 있는지 확인해보세요</Text>
      <MMMInput
        size={"searchPrice"}
        placeholder="어떤 시세 정보가 궁금하세요?"
        style={{ border: "2px solid #282190" }}
      />
    </Wrapper>
  );
};

export default PriceSearch;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const Title = styled.div`

  height: 50px;
  padding-bottom: 100px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 100%;
    padding-bottom: 0px;
    /* height: 40px; */
    font-size: 24px;
    ${flexCenter}
  }

`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: none;
  }

`;
