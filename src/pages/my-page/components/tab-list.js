import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useState } from "react";
import RegisteredProducts from "./register-product/my-products";

const TabList = () => {
  // product filter tabs
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: "등록물품", content: <RegisteredProducts /> },
    { name: "구매물품", content: "구매물품 관련 내용" },
    { name: "관심상품", content: "관심상품 관련 내용" },
    { name: "가계부", content: "가계부 관련 내용" },
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
