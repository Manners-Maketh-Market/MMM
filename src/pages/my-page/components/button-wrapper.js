import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import MMMButton from "components/button";

const ChangeInfoButtons = () => {
  return (
    <Wrapper>
      <MMMButton variant={"secondary"} size={"medium"}>
        개인정보 수정
      </MMMButton>
      <MMMButton variant={"secondary"} size={"medium"}>
        비밀번호 변경
      </MMMButton>
      <MMMButton variant={"secondary"} size={"medium"}>
        채팅 목록
      </MMMButton>
    </Wrapper>
  );
};
export default ChangeInfoButtons;

const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}

  & > button:nth-of-type(2) {
    margin: 0 32px;
  }
`;
