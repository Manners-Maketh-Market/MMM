import MMMButton from "components/button";
import UserInfo from "components/userInfo";
import { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const MyPage = () => {
  // product filter tabs
  const [currentTab, setCurrentTab] = useState(0);

  const Tabs = [
    { name: "등록물품", content: "등록물품 관련 내용" },
    { name: "구매물품", content: "구매물품 관련 내용" },
    { name: "관심상품", content: "관심상품 관련 내용" },
    { name: "가계부", content: "가계부 관련 내용" },
  ];

  const selectedTab = (index) => {
    setCurrentTab(index);
  };

  return (
    <Wrapper>
      <UserContainer>
        <UserInfo />
        <ButtonWrapper>
          <MMMButton variant={"secondary"} size={"medium"}>
            개인정보 수정
          </MMMButton>
          <MMMButton variant={"secondary"} size={"medium"}>
            비밀번호 변경
          </MMMButton>
          <MMMButton variant={"secondary"} size={"medium"}>
            채팅 목록
          </MMMButton>
        </ButtonWrapper>
      </UserContainer>
      <FilterProducts>
        <TabList>
          {Tabs.map((tab, index) => (
            <li
              className={index === currentTab ? "tab focused" : "tab"}
              onClick={() => selectedTab(index)}
            >
              {tab.name}
            </li>
          ))}
        </TabList>
        <Contents>{Tabs[currentTab].content}</Contents>
      </FilterProducts>
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
// upper userInfo. container
const UserContainer = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

// userInfo. button wrapper
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > button:nth-of-type(2) {
    margin: 0 32px;
  }
`;

// bottom 4 tabs
const FilterProducts = styled.div``;
const TabList = styled.ul`
  color: navy;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7rem;
  margin-top: 10px;
  cursor: pointer;

  .tab {
    width: calc(100% / 4);
    min-width: 298px;
    height: 80px;
    margin: 0 2px;
    ${flexCenter}
    border: 1px solid navy;
    transition: 0.5s;
  }

  .focused {
    background-color: navy;
    color: white;
  }
`;
const Contents = styled.li`
  width: 100%;
  min-height: 900px;
  ${flexCenter}
`;
