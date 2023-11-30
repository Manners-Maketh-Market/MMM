import styled from "styled-components";
import UserInfo from "components/user-Info";
import TabList from "./components/tab-list";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import AuthApi from "apis/auth";

const MyPage = () => {
  const { data: myPageData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PAGE_DATA],
    () => AuthApi.getMyPageData()
  );

  return (
    myPageData && (
      <Wrapper>
        <UserContainer>
          <UserInfo user={myPageData.User} temp={myPageData} />
        </UserContainer>
        <TabList user={myPageData.User} />
      </Wrapper>
    )
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
