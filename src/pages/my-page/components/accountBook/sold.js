import styled from "styled-components";

const Sold = () => {
  return (
    <Container>
      <TextBox>
        <h2>판매 건수</h2>
        <h2>0 건</h2>
      </TextBox>
      <TextBox>
        <h2>누적 판매 금액</h2>
        <h2>0 원</h2>
      </TextBox>
      <Comments>
        <p>
          10월에는 판매를 한 적이 없으시네요. <br />
          user_id_012 님, 지금 집에서 잠자고 있는 물건을 찾아보세요!
        </p>
        <p>
          다음 달에는 다른 이용자 분들과의 중고 거래로 미니멀 라이프를 시작해
          보세요. 시작이 반이랍니다~
        </p>
        <p>10월 1일부터 마지막 날까지 판매된 상품에 한 해 계산하고 있어요</p>
      </Comments>
    </Container>
  );
};
export default Sold;

const Container = styled.div``;
const TextBox = styled.div`
  width: 1000px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom: 1px solid #d1d1dd;
  padding: 0 40px;

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 220px;
    height: 50px;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 400px;
    height: 65px;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    width: 660px;
    height: 75px;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
const Comments = styled.div`
  width: 1000px;
  height: 240px;
  margin: 85px 0;
  padding: 100px;
  background-color: ${({ theme }) => theme.COLORS.gray[100]};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  word-break: keep-all;
  & > p {
    line-height: 130%;
    padding: 10px 0;
  }
  & > p:last-of-type {
    color: ${({ theme }) => theme.COLORS.gray[500]};
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 210px;
    height: 200px;
    padding: 20px;
    margin: 40px 0;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 380px;
    height: 260px;
    padding: 50px;
    margin: 60px 0;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    width: 660px;
    height: 200px;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
