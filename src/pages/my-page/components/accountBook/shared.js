import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const Shared = () => {
  return (
    <Container>
      <TextBox>
        <h2>우리 동네 횟수</h2>
        <h2>1,234 건</h2>
      </TextBox>
      <TextBox>
        <h2>나눔 횟수</h2>
        <h2>함께해요</h2>
      </TextBox>
      <Comments>
        <p>
          user_id_012 님, 집에 잠들어 있는 물건이 있다면 다음 달에는 따뜻한
          나눔으로 새 주인을 찾아주는 건 어떠세요? <br />
          쓰임을 찾은 물건도 더 행복할 거에요!
        </p>
        <p>
          우리 동네 이웃들이 총 1,234번의 따뜻함을 선물했어요. 역삼동 근처
          이웃이 나눔한 물건들은 새로운 추억을 쌓아가고 있어요. <br />
          더는 사용하지 않는 물건에게 새 주인을 찾아주고, 나눔으로 따뜻한 마음도
          함께 선물해주세요.
        </p>
        <p>당신의 나눔을 응원해요. 우리 함께 따뜻한 거래 문화를 만들어가요.</p>
      </Comments>
    </Container>
  );
};
export default Shared;

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
  & > p {
    line-height: 130%;
    padding: 10px 0;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 210px;
    height: 260px;
    padding: 20px;
    margin: 40px 0;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 380px;
    height: 280px;
    padding: 50px;
    margin: 60px 0;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    width: 660px;
    height: 250px;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
