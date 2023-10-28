import { Api } from 'apis';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { worker } from '../../../__mock__/browser';
import OneProduct from './one-product';
import { PRODUCT_QUERY_KEY } from 'consts';
import { Grid, GridItem } from '@chakra-ui/react';
import { flexCenter } from 'styles/common.style';
import styled from 'styled-components';

const ProductList = () => {
    if (process.env.NODE_ENV === 'development') {
        worker.start();
    }
    const params = useParams();
    const saleStatus = params.saleStatus;

    const { data: productList } = useQuery([PRODUCT_QUERY_KEY.MORE_PRODUCT_LIST, saleStatus], () =>
        Api.getSaleStatusProduct(saleStatus)
    );


    return (
        productList && (
            <S.Wrapper  >
                <Grid templateColumns="repeat(4, 1fr)" gap={50} gridColumnGap={15}>
                    {productList[0].map((product) => (
                        <GridItem w="280" h="">
                            <OneProduct
                                title={product.title}
                                content={product.content}
                                img={product.Product_img}
                                price={product.price}
                                isLiked={product.isLiked}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </S.Wrapper>
        )
    );
};

export default ProductList;

const Wrapper = styled.div`
    ${flexCenter};
    padding: 100px 0px;
`;

const S = {
    Wrapper,
};

