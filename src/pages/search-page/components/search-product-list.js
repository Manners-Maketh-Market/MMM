import { worker } from '__mock__/browser';
import { Api } from 'apis';
import OneProduct from 'components/one-product';
import { PRODUCT_QUERY_KEY } from 'consts';
import { useQuery } from 'react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import NoResultPage from './no-result-page';
import SearchPageTitle from './search-page-title';

const SearchProductList = () => {
    if (process.env.NODE_ENV === 'development') {
        worker.start();
    }


    const params = useParams();
    const searchValue = params.searchValue;

    const { data: searchUsedProducts } = useQuery([PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST, searchValue], () =>
        Api.getSearchProduct(0, searchValue, 1)
    );

    console.log(searchUsedProducts);

    const searchProductList = searchUsedProducts && searchUsedProducts.product;

    // 데이터 패칭확인,
    return (
        searchProductList && (
            <S.Wrapper>
                {searchProductList.length === 0 || searchValue === 194191464161616511 ? (
                    <NoResultPage />
                ) : (
                    <>
                        <S.TitleWrapper>
                            <SearchPageTitle totalProductsCount={searchProductList.length} searchValue={searchValue} />
                        </S.TitleWrapper>
                        <hr />
                    </>
                )}

                <Container style={{ marginTop: 100 }}>
                    <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} style={{ paddingBottom: 20 }}>
                        {searchProductList.map((product, index) => (
                            <Grid key={index} product xs={12} md={4} lg={3} style={{ paddingBottom: 40 }}>
                                <OneProduct
                                    title={product.title}
                                    content={product.content}
                                    img={product.img_url}
                                    price={product.price}
                                    isLiked={product.isLiked}
                                    status={product.status}
                                    description={product.description}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </S.Wrapper>
        )
    );
};
export default SearchProductList;

const Wrapper = styled.div`
    @media ${({ theme }) => theme.DEVICE.mobile} {
        padding-top: 80px;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 1165px;
    margin: 0 auto;
    padding-top: 36px;
    @media ${({ theme }) => theme.DEVICE.mobile} {
        justify-content: flex-start;
        flex-direction: column;
        margin-left: 32px;
    }
    @media ${({ theme }) => theme.DEVICE.tablet} {
        justify-content: flex-start;
        flex-direction: column;
        margin-left: 32px;
    }
`;

const S = {
    TitleWrapper,
    Wrapper,
};
