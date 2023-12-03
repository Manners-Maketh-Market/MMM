import { useState } from "react";
import MyAccountBook from "./account-book/my-account-book";
import RegisteredProducts from "./register-product/my-products";
import EditAccountInfo from "./edit-account";
import PurchasedProducts from "./purchased-product";
import InterestedProducts from "./interested-product";
import ChangePassword from "./password-change";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";

const TabList = ({ user }) => {
  // product filter tabs
  const [currentTab, setCurrentTab] = useState(3);

  const tabs = [
    { name: "개인정보 수정", content: <EditAccountInfo user={user} /> },
    { name: "비밀번호 변경", content: <ChangePassword user={user} /> },
    { name: "채팅 목록", content: "채팅 목록 띄우기" },
    { name: "등록물품", content: <RegisteredProducts user={user} /> },
    { name: "구매물품", content: <PurchasedProducts user={user} /> },
    { name: "관심상품", content: <InterestedProducts user={user} /> },
    { name: "가계부", content: <MyAccountBook user={user} /> },
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
            key={index}
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
      min-width: 260px;
      height: 60px;
      margin: 30px 20px 20px;
      border-radius: 4px;
    }
    &:nth-of-type(4),
    &:nth-of-type(5),
    &:nth-of-type(6),
    &:nth-of-type(7) {
      min-width: 270px;
      height: 80px;
      margin: 0 2px;
    }
  }

  .focused {
    background-color: navy;
    color: white;
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    font-size: 10px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
    .tab {
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        min-width: 70px;
        height: 36px;
        margin: 0 2px 10px;
      }
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6),
      &:nth-of-type(7) {
        min-width: 58px;
        height: 36px;
        margin: 0 1px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    font-size: 12px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
    .tab {
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        min-width: 92px;
        height: 36px;
        margin: 20px 5px 10px;
      }
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6),
      &:nth-of-type(7) {
        min-width: 96px;
        height: 42px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

    .tab {
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        min-width: 170px;
        height: 46px;
        margin: 20px 10px 12px;
      }
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6),
      &:nth-of-type(7) {
        min-width: 170px;
        height: 56px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.larger} {
    .tab {
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        min-width: 270px;
        height: 60px;
        margin: 30px 16px 20px;
      }
      &:nth-of-type(4),
      &:nth-of-type(5),
      &:nth-of-type(6),
      &:nth-of-type(7) {
        min-width: 295px;
        height: 80px;
      }
    }
  }
`;

const Contents = styled.div`
  width: 100%;
  min-height: 600px;
  ${flexAlignCenter}
`;
