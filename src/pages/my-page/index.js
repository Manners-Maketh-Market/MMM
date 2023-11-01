import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import UserInfo from "components/userInfo";
import TabList from "./components/tab-list";
import { MockUserData } from "__mock__/faker-data";

const MyPage = () => {
  // getUserInfo. (temporary)
  const user = MockUserData(1);
  console.log("The user >>", user);

  return (
    <Wrapper>
      <UserContainer>
        <UserInfo user={user} />
      </UserContainer>
      <TabList user={user} />
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
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
