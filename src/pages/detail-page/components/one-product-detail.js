import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import AuthApi from "apis/auth";
import { useState } from "react";
import ImgSlider from "components/img-slider";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import RightInfoContainer from "./info-container";
import Description from "./product-description";
import ProductAlert from "./product-alert";

const OneProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);

  // id 값과 같은 데이터를 recoil에 저장한 use데이터목록에서 가져오기
  const param = useParams();
  const dataId = param.id;

  // 물품 상세 정보
  const { data: detailProduct, refetch } = useQuery(
    [PRODUCT_QUERY_KEY.DETAIL_PRODUCT_DATA],
    () => Api.getDetailProduct(dataId)
  );

  // 유저 정보
  const { data: userInfoData } = useQuery([PRODUCT_QUERY_KEY.USER_DATA], () =>
    AuthApi.getUserData()
  );

  return (
    <>
      {detailProduct && (
        <Wrapper>
          <Container>
            <ProductInfo>
              <ImgSlider product={detailProduct.searchProduct} />
              <RightInfoContainer
                product={detailProduct.searchProduct}
                setIsLike={setIsLike}
                setOpen={setOpen}
                refetch={refetch}
                dataId={dataId}
                userInfoData={userInfoData}
              />
            </ProductInfo>
            <Description
              product={detailProduct.searchProduct}
              userInfoData={userInfoData}
              dataId={dataId}
            />
            <RelatedProduct>
              <span>연관상품</span>
              <ImgSlider related={detailProduct.relatedProduct.product} />
            </RelatedProduct>
          </Container>
          <ProductAlert open={open} setOpen={setOpen} isLike={isLike} />
        </Wrapper>
      )}
    </>
  );
};

export default OneProductDetail;

const Wrapper = styled.div`
  ${flexCenter}
  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 80px;
  }
`;

const Container = styled.div`
  width: 1180px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
  }
`;

const ProductInfo = styled.div`
  ${flexCenter}

  padding-bottom: 30px;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: flex;
    flex-direction: column;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const RelatedProduct = styled.div`
  width: 100%;
  margin-top: 100px;

  overflow: hidden;
  border-top: 1px solid #e1e1e1;
  padding-top: 40px;

  & > span {
    font-size: 32px;
    font-weight: 600;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin-top: 40px;

    & > span {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
`;
