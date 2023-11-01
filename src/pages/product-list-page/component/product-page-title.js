import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ProductPageTitle = () => {
    const params = useParams();
    const productPageTitle = params.saleStatus;

    return (
        // saleStatus에 따라서 중고거래와 무료나눔으로 바꿈
        <>{productPageTitle === 'sell' ? <S.Title>중고거래</S.Title> : <S.Title>무료나눔</S.Title>}</>
    );
};

export default ProductPageTitle;

const Title = styled.div`
    border-bottom: 0.5px solid #5b5b5b;
    padding-left: 350px;
    font-size: ${({ theme }) => theme.FONT_SIZE.extraLarge};
    font-weight: 800;
    color: ${({ theme }) => theme.COLORS.primary.blue};
    padding-bottom: 15px;
`;

const S = {
    Title,
};
