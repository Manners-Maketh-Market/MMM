import { useQuery } from "react-query";
import { useState } from "react";
import AuthApi from "apis/auth";
import { PRODUCT_QUERY_KEY } from "consts";
import MMMButton from "components/button";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { Container, Grid } from "@mui/material";
import UseNavigation from "hooks/use-navigation";

const RegisteredProducts = () => {
  const { goToRegisterProductPage, goToDetailPage } = UseNavigation();

  const registerForm = () => {
    goToRegisterProductPage();
  };

  // getMyProductList
  const { data: getMyProductList } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PRODUCT_LIST],
    () => AuthApi.getMyProductList(1, 0)
  );

  const onToDetailPage = (id) => {
    goToDetailPage(id);
    window.scrollTo({ top: 0 });
  };

  // tabs : 구매목록/판매목록 별 제품 나눠보기
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [{ name: "판매 중" }, { name: "판매 완료" }];
  const selectedTab = (index) => {
    setCurrentTab(index);
  };

  const filterProductsByStatus = (products, status) => {
    return products
      ? products.filter((product) => product.status === status)
      : [];
  };

  const OnSaleProducts = filterProductsByStatus(
    getMyProductList && getMyProductList.products,
    "판매중"
  );
  const SoldProducts = filterProductsByStatus(
    getMyProductList && getMyProductList.products,
    "판매완료"
  );

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
      {OnSaleProducts.length > 0 || SoldProducts.length > 0 ? (
        <Container>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {currentTab === 0
              ? OnSaleProducts.map((list, index) => (
                  <Grid style={{ margin: 2 }}>
                    <OneImage
                      src={list.img_url}
                      onClick={() => onToDetailPage(list.idx)}
                    />
                  </Grid>
                ))
              : SoldProducts.map((list, index) => (
                  <Grid style={{ margin: 2 }}>
                    <OneImage
                      src={list.img_url}
                      onClick={() => onToDetailPage(list.idx)}
                    />
                  </Grid>
                ))}
          </Grid>
        </Container>
      ) : (
        <div>
          <p>등록된 상품이 없습니다.</p>
          <MMMButton
            onClick={registerForm}
            variant={"secondary"}
            size={"medium"}
          >
            물품 등록하기
          </MMMButton>
        </div>
      )}
    </Wrapper>
  );
};
export default RegisteredProducts;

const Wrapper = styled.div`
  & > div {
    height: fit-content;
    position: absolute;
    overscroll-behavior-block: contain;
    top: 60%;
    left: 58%;
    transform: translateX(-50%);
    & > p {
      text-align: center;
      margin-bottom: 8px;
      color: ${({ theme }) => theme.COLORS.gray[400]};
      font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
    }
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    min-height: 400px;

    & > div {
      & > p {
        font-size: 10px;
      }
      & > button {
        font-size: 10px;
        width: 140px;
        height: 40px;
      }
    }
  }

  @media ${({ theme }) => theme.DEVICE.tablet2} {
    & > div {
      top: 45%;
      left: 56%;
      & > p {
        font-size: 12px;
      }
      & > button {
        font-size: 12px;
        width: 180px;
        height: 46px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    & > div {
      left: 51%;
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > button {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
        width: 230px;
        height: 50px;
      }
    }
  }
`;

const Tabs = styled.ul`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  position: absolute;
  left: 5%;
  top: 45%;

  &:hover {
    cursor: pointer;
  }

  & > li {
    ${flexCenter}
    width: 96px;
    height: 30px;
    border-radius: 50px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    font-size: 16px;

    &:nth-of-type(2) {
      margin: 0 10px;
    }

    &:hover {
      cursor: pointer;
    }

    &.focused {
      background-color: navy;
      color: white;
    }
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    top: 34%;
    height: 20px;
    & > li {
      width: 50px;
      height: 20px;
      font-size: 8px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    top: 36%;
    height: 24px;
    & > li {
      width: 74px;
      height: 26px;
      font-size: 14px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    top: 40%;
  }
`;

const OneImage = styled.img`
  width: 330px;
  height: 330px;
  position: relative;
  transition: all 0.5s;
  border: 1px solid #000;

  &:hover {
    cursor: pointer;
    opacity: 0.3;
  }
`;
