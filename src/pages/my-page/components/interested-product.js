import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_QUERY_KEY } from 'consts';
import AuthApi from 'apis/auth';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';

const InterestedProducts = ({ user }) => {
    const { data: getInterestedProductList } = useQuery([PRODUCT_QUERY_KEY.GET_INTERESTED_PRODUCT_LIST], () =>
        AuthApi.getInterestedProductList(1)
    );

    const navigate = useNavigate();

    const onToDetailPage = (id) => {
        navigate(`/MMM/products/detail/${id}`);
        window.scrollTo({ top: 0 });
    };

    return (
        getInterestedProductList.LikeList && (
            <Wrapper>
                <Container style={{ marginTop: 100 }}>
                    <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} style={{ paddingBottom: 20 }}>
                        {getInterestedProductList.LikeList.map((list, index) => (
                            <Grid style={{ margin: 2 }}>
                                <OneImage src={list.Product.img_url} onClick={() => onToDetailPage(list.Product.idx)} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Wrapper>
        )
    );
};
export default InterestedProducts;

const Wrapper = styled.div`
    & > div {
        height: fit-content;
        position: absolute;
        overscroll-behavior-block: contain;
        top: 40%;
        left: 58%;
        transform: translateX(-50%);
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
