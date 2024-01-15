import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import AuthApi from "apis/auth";
import { useState } from "react";
import { UsePriceComma } from "utils/use-price-comma";
import MMMButton from "components/button";
import ImgSlider from "components/img-slider";
import MannerTemperature from "components/manner-temperature";
import styled, { css } from "styled-components";
import { flexCenter, flexAlignCenter } from "styles/common.style";
import unProfile from "./../../../images/icon/unprofile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHeart,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import MMMAlert from "components/mmm-alert";

const OneProductDetail = () => {
  // alert
  const [open, setOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const navigate = useNavigate();
  const [isMoreContent, setIsMoreContent] = useState(true);

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
    if (SearchSellProductList.length < 1) {
      setPriceOpen(true);
    } else {
      navigate(`/MMM/pricecheckpage/${detailProduct.searchProduct.title}`);
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
          <ProductDetail>
            {/*상품 프로덕트 사진, 제목, 가격, 유저 정보, 찜, 채팅 */}
            <ImgAndInform>
              <ImgSlider product={detailProduct.searchProduct} />
              <Inform>
                <Title>상품제목 | {detailProduct.searchProduct.title}</Title>
                <FlexBox>
                  <Price>
                    {UsePriceComma(detailProduct.searchProduct.price)}원
                  </Price>
                  <p onClick={() => onMarketPricePage()}>
                    이 상품 시세 조회하러 가기
                  </p>
                </FlexBox>
                <UserProf>
                  <UserImgIdLoc>
                    <UserProfBox>
                      <ProfileImg>
                        <img
                          src={
                            detailProduct.searchProduct.User.profile_url
                              ? detailProduct.searchProduct.User.profile_url
                              : unProfile
                          }
                          width={"100%"}
                          height={"100%"}
                          alt="ProfileImg"
                        />
                      </ProfileImg>
                      <UserIdLoc>
                        <p>{detailProduct.searchProduct.User.nick_name}</p>
                        <p>{detailProduct.searchProduct.region}</p>
                      </UserIdLoc>
                    </UserProfBox>
                    <MannerTemperature
                      temp={detailProduct.searchProduct.User.Ondo}
                    ></MannerTemperature>
                  </UserImgIdLoc>
                </UserProf>
                <ul>
                  <List>
                    <Category>거래상태</Category>
                    {detailProduct.searchProduct.User.nick_name ===
                    userInfoData.nick_name ? (
                      <MMMButton
                        variant={
                          detailProduct.searchProduct.status === "판매중"
                            ? "detailY"
                            : "detailG"
                        }
                        onClick={onClickChangeProductStatus}
                        disabled={isClicked}
                      >
                        {detailProduct.searchProduct.status === "판매중"
                          ? "판매중"
                          : "판매완료"}
                      </MMMButton>
                    ) : (
                      <span>{detailProduct.searchProduct.status}</span>
                    )}
                  </List>
                  <List>
                    <Category>카테고리</Category>
                    {detailProduct.searchProduct.ProductsTags.map((tag) => (
                      <span>{tag.Tag.tag} </span>
                    ))}
                  </List>
                  <List>
                    <Category>등록일</Category>
                    <span>
                      {detailProduct.searchProduct.createdAt.split("T", 1)}
                    </span>
                  </List>
                  <List>
                    <Category>거래지역</Category>
                    <span>{detailProduct.searchProduct.region}</span>
                  </List>
                </ul>
                {detailProduct.searchProduct.User.nick_name !==
                  userInfoData.nick_name && (
                  <ButtonBox>
                    <MMMButton
                      variant={
                        detailProduct.searchProduct.liked === 1
                          ? "detailY"
                          : "detailG"
                      }
                      size={"medium"}
                      onClick={onClickLikedBtn}
                    >
                      <span>
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                      {detailProduct.searchProduct.liked === 1
                        ? "찜 했어요!"
                        : "찜 하기"}
                    </MMMButton>
                    <MMMButton variant={"detailB"} size={"medium"}>
                      <FontAwesomeIcon icon={faComments} /> 채팅하기
                    </MMMButton>
                  </ButtonBox>
                )}
              </Inform>
            </ImgAndInform>
            <Content isMore={isMoreContent}>
              {detailProduct.searchProduct.User.nick_name ===
                userInfoData.nick_name && (
                <ButtonWrapper>
                  <button onClick={onEditPost}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button onClick={onDeletePost}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </ButtonWrapper>
              )}
              <span>상품정보</span>
              {/*true 일때 일부분, false일 때 전체 내용 */}
              <p>{detailProduct.searchProduct.description}</p>
            </Content>
            {/*관련 상품 목록 */}
            <RelatedProduct>
              <span>연관상품</span>
              <ImgSlider related={detailProduct.relatedProduct.product} />
            </RelatedProduct>
          </ProductDetail>
          <AlertPosition open={open}>
            <MMMAlert
              size={"md"}
              color={isLike ? "success" : "warning"}
              severity={isLike ? "success" : "warning"}
              MessageTitle={isLike ? "Liked" : "unLiked"}
              AlertMessage={
                isLike
                  ? "찜을 하였습니다! 즐거운 쇼핑되세요! ㅇvㅇ"
                  : "찜을 취소하였습니다! 다른 상품은 어떠신가요! ㅇ3ㅇ."
              }
              open={open}
              setOpen={setOpen}
            />
          </AlertPosition>
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

const ProductDetail = styled.div`
  width: 1180px;

  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 90%;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 90%;
  }
`;

const ImgAndInform = styled.div`
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

const Inform = styled.div`
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
  // display: flex;
  // justify-content: space-between;

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

const List = styled.li`
  /* list-style: disc; */
  color: #757575;
  padding: 15px 0;

  & > span {
    font-weight: 700;
    color: #000;
  }
`;

const Category = styled.div`
  display: inline-block;
  width: 100px;
  color: #757575;
  font-weight: 400;
`;

const UserIdLoc = styled.div`
  & > p {
    padding: 5px 20px;
  }
  & > :nth-child(2) {
    color: #757575;
  }
`;

const ButtonBox = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 5%;
  right: 0;

  & > button {
    ${flexCenter}
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    transition: all 0.4s;

    &:nth-of-type(2) {
      margin-left: 10px;
    }
    &:hover {
      background-color: #e3e3e3;
    }

    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Content = styled.div`
  position: relative;
  margin-top: 50px;
  border-top: 1px solid #e1e1e1;
  padding-top: 70px;
  min-height: 484px;

  ${(props) =>
    props.isMore &&
    css`
      min-height: 484px;
      max-height: 600px;
      overflow: hidden;
    `}

  & > span {
    font-size: 32px;
    font-weight: 600;
  }

  & > p {
    padding-top: 30px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  @media ${({ theme }) => theme.DEVICE.mobile} {
    margin-top: 0;
    padding-top: 30px;
    min-height: 124px;
    & > span {
      font-size: 1.2rem;
      font-weight: 700;
    }
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

const AlertPosition = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  z-index: ${({ open }) => (open ? 100 : -100)};
  position: absolute;
  top: 8%;
`;
