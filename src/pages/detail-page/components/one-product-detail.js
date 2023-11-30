import MMMButton from "components/button";
import ImgSlider from "components/img-slider";
import styled, { css } from "styled-components";
import { flexCenter, flexAlignCenter } from "styles/common.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHeart,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UsePriceComma } from "hooks/use-price-comma";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import AuthApi from "apis/auth";
import MannerTemperature from "components/manner-temperature";
import { useState } from "react";
import unProfile from "./../../../images/icon/unprofile.png";

const OneProductDetail = () => {
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

  const { mutateAsync: onSellMutation } = useMutation((id) =>
    Api.postSaleComplete(id)
  );

  const { mutateAsync: deleteMyPost } = useMutation((id) =>
    Api.deleteMyPost(id)
  );

  const onClickLikedBtn = async () => {
    if (detailProduct.searchProduct.liked === 1) {
      await onLikeMutation(dataId);
      alert("찜을 취소하였습니다! 다른 상품은 어떠신가요! ㅇ3ㅇ");
    } else if (detailProduct.searchProduct.liked === 0) {
      await onLikeMutation(dataId);
      alert("찜을 하였습니다! 즐거운 쇼핑되세요! ㅇvㅇ");
    }
    refetch();
  };

  const onClickChangeProductStatus = async () => {
    if (detailProduct.searchProduct.status === "판매중") {
      await onSellMutation(dataId, "d57225ad2-221e-bc38-5ed926f2ffd2");
      alert("판매완료로 변경되었습니다.");
    } else {
      alert("다시 판매 중으로 변경합니다.");
    }
    refetch();
  };

  const onMarketPricePage = () => {
    const titleValue = detailProduct.searchProduct.title;

    navigate(`/pricecheckpage/${titleValue}`);
  };
  const onMoreContentBtn = () => {
    setIsMoreContent((prev) => !prev);
  };

  // delete & edit post
  const onDeletePost = async () => {
    await deleteMyPost(dataId);
    alert("게시글이 삭제되었습니다.");
    navigate("/");
  };

  const onEditPost = () => {
    navigate(`/edit-post/${dataId}`);
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
                {/* <hr /> */}
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
                    {/* <MMMButton
                      variant={
                        detailProduct.searchProduct.status === "판매중"
                          ? "detailY"
                          : "detailG"
                      }
                      onClick={onClickChangeProductStatus}
                    >
                      {detailProduct.searchProduct.status === "판매중"
                        ? "판매중"
                        : detailProduct.searchProduct.status === "판매완료"
                        ? "판매완료"
                        : null}
                    </MMMButton> */}
                    <span>{detailProduct.searchProduct.status}</span>
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
            <MMMButton
              variant={"More"}
              style={{ border: "1px solid #9F9EB3" }}
              onClick={onMoreContentBtn}
            >
              More
            </MMMButton>
            {/*관련 상품 목록 */}
            <RelatedProduct>
              <span>연관상품</span>
              <ImgSlider related={detailProduct.relatedProduct.product} />
            </RelatedProduct>
          </ProductDetail>
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
