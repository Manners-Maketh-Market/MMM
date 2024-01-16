import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import AuthApi from "apis/auth";
import { useState } from "react";
import { UsePriceComma } from "utils/use-price-comma";
import MMMButton from "components/button";
import ImgSlider from "components/img-slider";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import RightInfoContainer from "./info-container";
import Description from "./product-description";
import { useState } from "react";
import ProductAlert from "./product-alert";

const OneProductDetail = () => {
  const [open, setOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
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

  const { mutateAsync: onLikeMutation } = useMutation((id) =>
    Api.postLikedProduct(id)
  );

  const { mutateAsync: onSellMutation, data: sellData } = useMutation(
    (requestData) => Api.postSaleComplete(requestData)
  );

  const { mutateAsync: deleteMyPost } = useMutation((id) =>
    Api.deleteMyPost(id)
  );

  const { data: SearchProductList } = useQuery(
    [PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST],
    () => Api.getSearchProduct(0, detailProduct.searchProduct.title, 1)
  );

  // 판매완료된 상품 리스트
  const SearchSellProductList =
    SearchProductList &&
    SearchProductList.product.filter((list) => list.status === "판매완료");

  const onClickLikedBtn = async () => {
    if (detailProduct.searchProduct.liked === 1) {
      await onLikeMutation(dataId);
      setIsLike(false);
      setOpen(true);
    } else if (detailProduct.searchProduct.liked === 0) {
      await onLikeMutation(dataId);
      setIsLike(true);
      setOpen(true);
    }
    refetch();
  };
  const [isClicked, setIsClicked] = useState(false);

  const onClickChangeProductStatus = async () => {
    await onSellMutation({
      prod_idx: dataId,
      socket: "f934a0af-58ba-433a-9362-57f9ed0a5569",
    });
    alert("해당 제품은 판매완료로 변경되었습니다.");
    setIsClicked(true);
  };

  const onMarketPricePage = () => {
    const titleValue = detailProduct.searchProduct.title;
    if (SearchSellProductList.length < 1) {
      setPriceOpen(true);
    } else {
      navigate(`/MMM/pricecheckpage/${titleValue}`);
    }
  };

  // delete & edit post
  const onDeletePost = async () => {
    await deleteMyPost(dataId);
    alert("게시글이 삭제되었습니다.");
    navigate("/MMM/home");
  };

  const onEditPost = () => {
    navigate(`/MMM/edit-post/${dataId}`);
  };

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
