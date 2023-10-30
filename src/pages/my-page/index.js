import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import UserInfo from "components/userInfo";
import ChangeInfoButtons from "./components/button-wrapper";
import TabList from "./components/tab-list";

const MyPage = () => {
  return (
    <Wrapper>
      <UserContainer>
        <UserInfo />
        <ChangeInfoButtons />
      </UserContainer>
      <TabList />
    </Wrapper>
  );
};
export default MyPage;

const Wrapper = styled.div`
  min-width: 1200px;
  margin: 0 20%;
  ${flexCenter}
  flex-direction: column;
`;

const UserContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
