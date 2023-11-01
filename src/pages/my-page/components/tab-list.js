import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useState } from "react";
import RegisteredProducts from "./register-product/my-products";
import EditAccountInfo from "./edit-account";
import ChangePassword from "./password-change";
import AccountBook from "./accountBook/account-book";
import PurchasedProducts from "./purchased-product";
import InterestedProducts from "./interested-product";

const TabList = () => {
  // product filter tabs
  const [currentTab, setCurrentTab] = useState(3);

  // mediaQuery : 2114px 이상부터는 tab 배열이 어그러짐
  const tabs = [
    { name: "개인정보 수정", content: <EditAccountInfo /> },
    { name: "비밀번호 변경", content: <ChangePassword /> },
    { name: "채팅 목록", content: "채팅 목록 띄우기" },
    { name: "등록물품", content: <RegisteredProducts /> },
    { name: "구매물품", content: <PurchasedProducts /> },
    { name: "관심상품", content: <InterestedProducts /> },
    { name: "가계부", content: <AccountBook /> },
  ];

  const selectedTab = (index) => {
    setCurrentTab(index);
  };

  return (
    <Wrapper>
      <Tabs>
        {tabs.map((tab, index) => (
          <li
            className={index === currentTab ? "tab focused" : "tab"}
            onClick={() => selectedTab(index)}
          >
            {tab.name}
          </li>
        ))}
      </Tabs>
      <Contents>{tabs[currentTab].content}</Contents>
    </Wrapper>
  );
};
export default TabList;

const Wrapper = styled.div``;

const Tabs = styled.ul`
  color: navy;
  font-weight: bold;
  ${flexCenter}
  flex-wrap: wrap;
  cursor: pointer;

  .tab {
    ${flexCenter}
    flex-wrap: nowrap;
    border: 1px solid navy;
    transition: 0.5s;

    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
      min-width: 285px;
      height: 60px;
      margin: 30px 20px 0;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    &:nth-of-type(4),
    &:nth-of-type(5),
    &:nth-of-type(6),
    &:nth-of-type(7) {
      min-width: 290px;
      height: 80px;
      margin: 0 2px;
    }
  }

  .focused {
    background-color: navy;
    color: white;
  }
`;

const Contents = styled.li`
  width: 100%;
  height: fit-content;
  min-height: 600px;
  ${flexCenter}
`;
