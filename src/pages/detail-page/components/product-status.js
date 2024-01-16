import styled from "styled-components";
import MMMButton from "components/button";
import { useState } from "react";

const ProductStatusContainer = ({
  product,
  userInfoData,
  onSellMutation,
  dataId,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const onChangeProductStatus = async () => {
    await onSellMutation({
      prod_idx: dataId,
      socket: "f934a0af-58ba-433a-9362-57f9ed0a5569",
    });
    alert("해당 제품은 판매완료로 변경되었습니다.");
    setIsClicked(true);
  };
  return (
    <Container>
      <List>
        <Category>거래상태</Category>
        {product.User.nick_name === userInfoData.nick_name ? (
          <MMMButton
            variant={product.status === "판매중" ? "detailY" : "detailG"}
            onClick={onChangeProductStatus}
            disabled={isClicked}
          >
            {product.status === "판매중" ? "판매중" : "판매완료"}
          </MMMButton>
        ) : (
          <span>{product.status}</span>
        )}
      </List>
      <List>
        <Category>카테고리</Category>
        {product.ProductsTags.map((tag) => (
          <span>{tag.Tag.tag} </span>
        ))}
      </List>
      <List>
        <Category>등록일</Category>
        <span>{product.createdAt.split("T", 1)}</span>
      </List>
      <List>
        <Category>거래지역</Category>
        <span>{product.region}</span>
      </List>
    </Container>
  );
};
export default ProductStatusContainer;

const Container = styled.ul``;
const List = styled.li`
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
