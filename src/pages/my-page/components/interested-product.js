import styled from "styled-components";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InterestedProducts = ({ user }) => {
  const { data: getInterestedProductList } = useQuery(
    [PRODUCT_QUERY_KEY.GET_INTERESTED_PRODUCT_LIST],
    () => Api.getInterestedProductList(1)
  );

  const navigate = useNavigate();

  const onToDetailPage = (id) => {
    navigate(`/products/detail/${id}`);
    window.scrollTo({ top: 0 });
  };

  return (
    getInterestedProductList && (
      <Wrapper>
        <Container style={{ marginTop: 100 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2, lg: 3 }}
            style={{ paddingBottom: 20 }}
          >
            {getInterestedProductList.LikeList.map((list, index) => (
              <Grid style={{ margin: 2 }}>
                <OneImage
                  src={list.Product.img_url}
                  onClick={() => onToDetailPage(list.Product.idx)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    )
  );
};
export default InterestedProducts;

const Wrapper = styled.div``;
const OneImage = styled.img`
  background-color: lightgray;
  width: 330px;
  height: 330px;

  &:hover {
    cursor: pointer;
  }
`;
