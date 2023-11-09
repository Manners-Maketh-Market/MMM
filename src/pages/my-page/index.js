import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import UserInfo from "components/user-Info";
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
  // 1280+
  max-width: 1200px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700px;
  }
`;

const UserContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
