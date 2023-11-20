import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import Sold from "./sold";
import Shared from "./shared";
import Purchased from "./purchased";

const AccountBook = () => {
  return (
    <Wrapper>
      <Title>user_id_012 님의 10월 가계부 입니다.</Title>
      <Contents>
        <Sold />
        <Purchased />
        <Shared />
      </Contents>
    </Wrapper>
  );
};
export default AccountBook;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    margin-left: 0;
    ${flexCenter}
  }
`;
const Title = styled.h1`
  padding: 80px 0;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    padding: 50px 0;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    padding: 60px 0;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    padding: 60px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
const Contents = styled.form`
  ${flexAlignCenter}
  flex-direction: column;
  margin-left: 40px;
  & > input {
    width: 780px;
  }
  & > button {
    margin: 60px 0 100px;
  }
`;
