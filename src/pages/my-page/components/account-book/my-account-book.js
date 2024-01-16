import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import AuthApi from "apis/auth";
import { useState } from "react";
import useInputs from "hooks/use-inputs";
import Purchased from "./purchased";
import Sold from "./sold";
import Shared from "./shared";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import Product from "./one-account-product";

const MyAccountBook = () => {
  const [{ category }, onChangeInputs] = useInputs({
    category: "",
  });

  // data
  const { data: myPageData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PAGE_DATA],
    () => AuthApi.getMyPageData()
  );
  const { data: getMyHousekeepingBook } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_HOUSEKEEPING_BOOK],
    () => AuthApi.getMyHousekeepingBook(1, UserType, firstDay, lastDay)
  );

  // category type
  const UserType = {
    SELLER: "seller",
    BUYER: "buyer",
  };
  Object.freeze(UserType);

  // 매개변수를 전달을 위한 날짜 범위 나타내기
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  function formattedDate(today, dash = "-") {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return [year, month, date].join(dash);
  }

  const firstDay = formattedDate(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const lastDay = formattedDate(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  );

  const thisMonthSoldAmount =
    getMyHousekeepingBook?.data?.amount?.thisMonthSaleAmount ?? 0;
  const totalSoldAmount =
    getMyHousekeepingBook?.data?.amount?.totalSaleAmount ?? 0;
  const soldProductInfo = getMyHousekeepingBook?.data?.payList ?? [];

  const thisMonthPurchasedAmount =
    getMyHousekeepingBook?.data?.amount?.thisMonthPurchaseAmount ?? 0;
  const purchasedProductsInfo = getMyHousekeepingBook?.data?.payList ?? [];

  // tabs-contents
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    { name: "나눔목록", content: <Shared user={myPageData.User} /> },
    {
      name: "구매목록",
      content: (
        <Purchased
          user={myPageData.User}
          thisMonth={thisMonth}
          purchasedData={getMyHousekeepingBook}
          thisMonthPurchasedAmount={thisMonthPurchasedAmount}
          purchasedProductsInfo={purchasedProductsInfo}
        />
      ),
    },
    {
      name: "판매목록",
      content: (
        <Sold
          user={myPageData.User}
          thisMonth={thisMonth}
          soldData={getMyHousekeepingBook}
          thisMonthSoldAmount={thisMonthSoldAmount}
          totalSoldAmount={totalSoldAmount}
          soldProductInfo={soldProductInfo}
        />
      ),
    },
  ];

  const selectedTab = (index) => {
    setCurrentTab(index);
  };

  return (
    getMyHousekeepingBook && (
      <Wrapper>
        <Title>
          {myPageData.User.nickName}님의 {thisMonth}월 가계부 입니다.
        </Title>
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
    )
  );
};
export default MyAccountBook;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    margin-left: 0;
    ${flexCenter}
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    margin-left: 0;
    ${flexCenter}
  }
`;
const Title = styled.h1`
  padding: 80px 0 50px;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    padding: 50px 0;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    padding: 60px 0;
    font-size: 12px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    padding: 60px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  }
`;
const Contents = styled.form`
  ${flexAlignCenter}
  flex-direction: column;
  margin-left: 40px;
  & > input {
    width: 780px;
  }
  & > button {
    margin: 60px 0 100px;
  }
`;
const Tabs = styled.ul`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;

  & > li {
    ${flexCenter}
    width: 96px;
    height: 30px;
    border-radius: 50px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    font-size: 14px;

    &:nth-of-type(2) {
      margin: 0 10px;
    }

    &.focused {
      background-color: navy;
      color: white;
    }
  }
`;
