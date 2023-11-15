import MMMButton from "components/button";
import ImgSlider from "components/img-slider";
import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "styles/common.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UsePriceComma } from "hooks/use-price-comma";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";
import MannerTemperature from "components/manner-temperature";

const OneProductDetail = () => {
  // 임시로 사용할 데이터

  const navigate = useNavigate();

  // id 값과 같은 데이터를 recoil에 저장한 use데이터목록에서 가져오기
  const param = useParams();
  const dataId = param.id;

  const { data: detailProduct } = useQuery(
    [PRODUCT_QUERY_KEY.DETAIL_PRODUCT_DATA],
    () => Api.getDetailProduct(dataId)
  );
  console.log(detailProduct);

  const marketPricePage = () => {
    const titleValue = detailProduct.searchProduct.title;

    navigate(`/pricecheckpage/${titleValue}`);
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
                  <p onClick={() => marketPricePage()}>
                    이 상품 시세 조회하러 가기
                  </p>
                </FlexBox>
                {/* <hr /> */}
                <UserProf>
                  <UserImgIdLoc>
                    <UserProfBox>
                      <ProfileImg>
                        <img
                          src={detailProduct.searchProduct.User.profile_url}
                          width={"100%"}
                          height={"100%"}
                          alt="ProfileImg"
                        ></img>
                      </ProfileImg>
                      <UserIdLoc>
                        <p>{detailProduct.searchProduct.User.nick_name}</p>
                        <p>{detailProduct.searchProduct.region}</p>
                      </UserIdLoc>
                    </UserProfBox>
                    <MannerTemperature
                      user={detailProduct.searchProduct.User.Ondo}
                    ></MannerTemperature>
                  </UserImgIdLoc>
                </UserProf>
                <ul>
                  <List>거래상태</List>
                  <List>교환여부</List>
                  <List>배송비</List>
                  <List>거래지역</List>
                </ul>
                <ButtonBox>
                  <MMMButton variant={"detailG"} size={"medium"}>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                    </span>{" "}
                    찜 {detailProduct.searchProduct.liked}
                  </MMMButton>
                  <MMMButton variant={"detailB"} size={"medium"}>
                    <FontAwesomeIcon icon={faComments} /> 채팅하기
                  </MMMButton>
                </ButtonBox>
              </Inform>
            </ImgAndInform>
            <Content>
              <span>상품정보</span>
              <p>{detailProduct.searchProduct.description}</p>
            </Content>
            <MMMButton variant={"More"} style={{ border: "1px solid #9F9EB3" }}>
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
  list-style: disc;
  color: #757575;
  padding: 15px 0;
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

const Content = styled.div`
  min-height: 484px;

  margin-top: 50px;
  border-top: 1px solid #e1e1e1;
  padding-top: 70px;

  & > span {
    font-size: 32px;
    font-weight: 600;
  }

  & > p {
    padding-top: 30px;
    width: 200px;
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
