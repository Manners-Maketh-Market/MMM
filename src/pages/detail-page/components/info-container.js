import MannerTemperature from "components/manner-temperature";
import unProfile from "./../../../images/icon/unprofile.png";
import { flexAlignCenter } from "styles/common.style";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import ButtonBox from "./buttons";
import ProductStatusContainer from "./product-status";
import { PriceComma } from "utils/price-comma";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts/index";
import { useState } from "react";
import MMMAlert from "components/mmm-alert";

const RightInfoContainer = ({
  product,
  setIsLike,
  setOpen,
  refetch,
  dataId,
  userInfoData,
}) => {
  const navigate = useNavigate();
  const [priceOpen, setPriceOpen] = useState(false);

  const { data: SearchProductList } = useQuery(
    [PRODUCT_QUERY_KEY.SEARCH_PRODUCT_LIST],
    () => Api.getSearchProduct(0, product.title, 1)
  );

  // 판매완료된 상품 리스트
  const SearchSellProductList =
    SearchProductList &&
    SearchProductList.product.filter((list) => list.status === "판매완료");

  const onMarketPricePage = () => {
    const titleValue = product.title;

    if (SearchSellProductList.length < 1) {
      setPriceOpen(true);
    } else {
      navigate(`/MMM/pricecheckpage/${titleValue}`);
    }
  };

  return (
    <>
      <TextBox>
        <Title>상품제목 | {product.title}</Title>
        <FlexBox>
          <Price>{PriceComma(product.price)}원</Price>
          {SearchSellProductList && (
            <p onClick={() => onMarketPricePage()}>
              이 상품 시세 조회하러 가기
            </p>
          )}
        </FlexBox>
        <UserProf>
          <UserImgIdLoc>
            <UserProfBox>
              <ProfileImg>
                <img
                  src={
                    product.User.profile_url
                      ? product.User.profile_url
                      : unProfile
                  }
                  width={"100%"}
                  height={"100%"}
                  alt="ProfileImg"
                />
              </ProfileImg>
              <UserIdLoc>
                <p>{product.User.nick_name}</p>
                <p>{product.region}</p>
              </UserIdLoc>
            </UserProfBox>
            <MannerTemperature temp={product.User.Ondo} />
          </UserImgIdLoc>
        </UserProf>
        <ProductStatusContainer product={product} userInfoData={userInfoData} />
        <ButtonBox
          product={product}
          dataId={dataId}
          setIsLike={setIsLike}
          setOpen={setOpen}
          refetch={refetch}
          userInfoData={userInfoData}
        />
      </TextBox>
      <AlertPosition open={priceOpen}>
        <MMMAlert
          size={"md"}
          color={"warning"}
          severity={"warning"}
          MessageTitle={"귀한 상품"}
          AlertMessage={
            "해당 상품은 거래내역이 존재하지 않아 시세조회가 불가능합니다."
          }
          open={priceOpen}
          setOpen={setPriceOpen}
        />
      </AlertPosition>
    </>
  );
};

export default RightInfoContainer;

const TextBox = styled.div`
  width: 100%;
  margin-left: 52px;
  & > ul {
    padding-left: 28px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 50px;
    margin-right: 52px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    padding-top: 100px;
    margin-right: 52px;
  }
`;

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 30px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    font-size: 20px;
  }
`;
const FlexBox = styled.p`
  ${flexAlignCenter}
  justify-content: space-between;
  margin-bottom: 24px;
  & > p:last-child {
    color: #757575;
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid #757575;
    padding-bottom: 1px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > p:last-child {
      padding-top: 20px;
    }
  }
`;

const Price = styled.p`
  font-size: 40px;
  font-weight: 700;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserProf = styled.div`
  border-top: 1px solid #e1e1e1;
  padding-top: 20px;
`;

const UserImgIdLoc = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
`;

const UserProfBox = styled.div`
  ${flexCenter}
`;

const UserIdLoc = styled.div`
  & > p {
    padding: 5px 20px;
  }
  & > :nth-child(2) {
    color: #757575;
  }
`;

const AlertPosition = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  z-index: ${({ open }) => (open ? 100 : -100)};
  position: absolute;
  top: 8%;
`;
