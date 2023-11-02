import { worker } from '__mock__/browser';
import { Api } from 'apis';
import OneProduct from 'components/one-product';
import { PRODUCT_QUERY_KEY } from 'consts';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchPageTitle from './search-page-title';
import NoResultPage from './no-result-page';
import { Container, Grid } from '@mui/material';

const SearchProductList = () => {
    if (process.env.NODE_ENV === 'development') {
        worker.start();
    }

    const params = useParams();
    const searchValue = params.searchValue;

    const { data: searchProducts } = useQuery([PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST, searchValue], () =>
        Api.getSearchProduct(searchValue)
    );

    return (
        searchProducts && (
            <>
                {searchProducts[0].length === 0 || searchValue === 194191464161616511 ? (
                    <NoResultPage />
                ) : (
                    <>
                        <S.TitleWrapper>
                            <SearchPageTitle totalProductsCount={searchProducts[0].length} searchValue={searchValue} />
                        </S.TitleWrapper>
                        <hr />
                    </>
                )}

                <Container style={{ marginTop: 100 }}>
                    <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} style={{ paddingBottom: 20 }}>
                        {searchProducts[0].map((product, index) => (
                            <Grid key={index} product xs={12} md={6} lg={3} style={{ paddingBottom: 40 }}>
                                <OneProduct
                                    title={product.title}
                                    content={product.content}
                                    img={product.Product_img}
                                    price={product.price}
                                    isLiked={product.isLiked}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </>
        )
    );
};
export default SearchProductList;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1165px;
    margin: 0 auto;
`;

const S = {
    TitleWrapper,
};

/*
  요구 사항 : 검색 값이 아무것도 없을 때 NoResultPage 보여주기

  axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 상태 코드가 500 미만인 경우에만 해결
  }
})

*/
