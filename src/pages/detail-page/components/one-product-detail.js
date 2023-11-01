import { MockProductsData } from "__mock__/faker-data";
import MMMButton from "components/button";
import ImgSlider from "components/imgSlider";
import styled from "styled-components";
import { flexCenter, flexAlignCenter } from "styles/common.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-solid-svg-icons";

const OneProductDetail = () => {
  const mock = MockProductsData(10);
  // 임시로 사용할 데이터

  return (
    <Wrapper>
      <ProductDetail>
        {/*상품 프로덕트 사진, 제목, 가격, 유저 정보, 찜, 채팅 */}
        <ImgAndInform>
          <ImgSlider product={mock[0]} />
          <Inform>
            <Title>상품제목 | {mock[0].title}</Title>
            <FlexBox>
              <Price>{mock[0].price}원</Price>
              <p>이 상품 시세 조회하러 가기</p>
            </FlexBox>
            <hr />
            <UserProf>
              <UserImgIdLoc>
                <ProfileImg>
                  <img
                    src={mock[0].User.profileImg}
                    width={"100%"}
                    height={"100%"}
                    alt="ProfileImg"
                  ></img>
                </ProfileImg>
                <UserIdLoc>
                  <p>{mock[0].User.id}</p>
                  <p>{mock[0].location}</p>
                </UserIdLoc>
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
                찜 {mock[0].likedCount}
              </MMMButton>
              <MMMButton variant={"detailB"} size={"medium"}>
                <FontAwesomeIcon icon={faComments} /> 채팅하기
              </MMMButton>
            </ButtonBox>
          </Inform>
        </ImgAndInform>
        <Content>
          <span>상품정보</span>
          <p>{mock[0].content}</p>
        </Content>
        <MMMButton variant={"More"} style={{ border: "1px solid #9F9EB3" }}>
          More
        </MMMButton>

        {/*관련 상품 목록 */}
        <RelatedProduct>
          <span>연관상품</span>
          <ImgSlider related={mock} />
        </RelatedProduct>
      </ProductDetail>
    </Wrapper>
  );
};

export default OneProductDetail;

const Wrapper = styled.div`
  ${flexCenter}
`;

const ProductDetail = styled.div`
  width: 1180px;
`;

const ImgAndInform = styled.div`
  ${flexCenter}
`;

const Inform = styled.div`
  width: 100%;
  margin-left: 52px;
  & > ul {
    padding-left: 28px;
  }
`;

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
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
  display: flex;
  justify-content: space-between;
`;

const UserImgIdLoc = styled.div`
  ${flexCenter}
  padding-bottom:20px;
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
  margin-top: 100px;

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
`;

const RelatedProduct = styled.div`
  width: 100%;
  margin-top: 100px;

  & > span {
    font-size: 32px;
    font-weight: 600;
  }
`;
