import { Container, Grid } from "@mui/material";
import AuthApi from "apis/auth";
import { PRODUCT_QUERY_KEY } from "consts";
import { useQuery } from "react-query";
import styled from "styled-components";

const PurchasedProducts = () => {
  // getMyProductList
  const { data: getMyProductList } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PRODUCT_LIST],
    () => AuthApi.getMyProductList(1, 1)
  );

  // getInterestedProductList

  return (
    getMyProductList && (
      <Wrapper>
        <Container>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            <Grid
              /* key={index} */
              item
              xs={12}
              md={4}
              lg={3}
              style={{ paddingBottom: 40 }}
            ></Grid>
          </Grid>
        </Container>
      </Wrapper>
    )
  );
};
export default PurchasedProducts;

const Wrapper = styled.div``;
