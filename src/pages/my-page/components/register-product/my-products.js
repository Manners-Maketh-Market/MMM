import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MMMButton from "components/button";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";
import { Container, Grid } from "@mui/material";

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

  return (
    <Wrapper>
      {getMyProductList ? (
        <Container style={{ marginTop: 100 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {getMyProductList.products.map((list, index) => (
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
const OneImage = styled.img`
  background-color: lightgray;
  width: 330px;
  height: 330px;

  &:hover {
    cursor: pointer;
  }
`;
