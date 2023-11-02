import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexAlignCenter } from "styles/common.style";

const ChangePassword = () => {
  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <Contents>
        <MMMInput label={"비밀번호"} size={"editInfo"} placeholder="password" />
        <MMMInput
          label={"새 비밀번호"}
          size={"editInfo"}
          placeholder="new password"
        />
        <MMMInput
          label={"새 비밀번호 확인"}
          size={"editInfo"}
          placeholder="confirm new pasword"
        />
        <MMMButton size={"small"}>변경사항 저장</MMMButton>
      </Contents>
    </Wrapper>
  );
};
export default ChangePassword;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
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
  margin-top: 200px;
  margin-left: 40px;

  & > input {
    width: 780px;
  }

  & > button {
    margin: 60px 0 100px;
  }
`;
