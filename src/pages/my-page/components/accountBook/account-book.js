import styled from "styled-components";
import { flexAlignCenter } from "styles/common.style";
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
`;
const Title = styled.h1`
  padding: 80px 0;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
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
