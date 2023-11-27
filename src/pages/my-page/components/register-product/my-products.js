import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MMMButton from "components/button";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { flexCenter } from "styles/common.style";

const RegisteredProducts = () => {
  const navigate = useNavigate();

  const registerForm = () => {
    navigate("/my-page/registerProductForm");
  };

  // getMyProductList
  const { data: getMyProductList } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PRODUCT_LIST],
    () => Api.getMyProductList(1, 0)
  );

  const onToDetailPage = (id) => {
    navigate(`/products/detail/${id}`);
    window.scrollTo({ top: 0 });
  };

  // tabs : 구매목록/판매목록 별 제품 나눠보기
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [{ name: "판매 중" }, { name: "판매 완료" }];
  const selectedTab = (index) => {
    setCurrentTab(index);
  };

  const OnSaleProducts =
    getMyProductList &&
    getMyProductList.products.filter(
      (products) => products.status === "판매중"
    );
  const SoldProducts =
    getMyProductList &&
    getMyProductList.products.filter(
      (products) => products.status === "판매완료"
    );

  console.log("onSale :", OnSaleProducts, "onSold :", SoldProducts);

  // hover effect
  const [onShow, setOnShow] = useState(false);

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
      {getMyProductList ? (
        <Container style={{ marginTop: 100 }}>
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
        <>
          <p>등록된 상품이 없습니다.</p>
          <MMMButton
            onClick={registerForm}
            variant={"secondary"}
            size={"medium"}
          >
            물품 등록하기
          </MMMButton>
        </>
      )}
    </Wrapper>
  );
};
export default RegisteredProducts;

const Wrapper = styled.div`
  & > p {
    text-align: center;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.COLORS.gray[400]};
    font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    min-height: 400px;
    & > p {
      font-size: 10px;
    }
    & > button {
      font-size: 10px;
      width: 140px;
      height: 40px;
    }
  }

  @media ${({ theme }) => theme.DEVICE.tablet2} {
    & > p {
      font-size: 12px;
    }
    & > button {
      font-size: 12px;
      width: 180px;
      height: 46px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    & > p {
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
    & > button {
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      width: 230px;
      height: 50px;
    }
  }
`;

const Tabs = styled.ul`
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
    width: 90px;
    height: 28px;
    border-radius: 50px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    font-size: 12px;

    &:nth-of-type(2) {
      margin: 0 10px;
    }

    &.focused {
      background-color: navy;
      color: white;
    }
  }
`;

const OneImage = styled.img`
  width: 330px;
  height: 330px;
  position: relative;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    opacity: 0.3;
  }
`;
