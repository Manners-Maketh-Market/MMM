import styled from "styled-components";
import { Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";
import { worker } from "__mock__/browser";

const InterestedProducts = ({ user }) => {
  return (
    <Wrapper>
      <Grid templateColumns="repeat(3, 1fr)" gap={20}>
        <GridItem>{/* <OneImage img={item.Product_img} /> */}</GridItem>
      </Grid>
    </Wrapper>
  );
};
export default InterestedProducts;

const Wrapper = styled.div``;

const OneImage = styled.img`
  background-color: lightgray;
  width: 380px;
  height: 380px;
`;
