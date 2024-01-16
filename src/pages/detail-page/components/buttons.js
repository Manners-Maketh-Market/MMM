import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import { Api } from "apis";
import styled from "styled-components";
import MMMButton from "components/button";

const ButtonBox = ({
  product,
  dataId,
  setIsLike,
  setOpen,
  refetch,
  userInfoData,
}) => {
  const { mutateAsync: onLikeMutation } = useMutation((id) =>
    Api.postLikedProduct(id)
  );

  const onClickLikedBtn = async () => {
    if (product.liked === 1) {
      await onLikeMutation(dataId);
      setIsLike(false);
      setOpen(true);
    } else if (product.liked === 0) {
      await onLikeMutation(dataId);
      setIsLike(true);
      setOpen(true);
    }
    refetch();
  };

  return (
    product.User.nick_name !== userInfoData.nick_name && (
      <Container>
        <MMMButton
          variant={product.liked === 1 ? "detailY" : "detailG"}
          size={"medium"}
          onClick={onClickLikedBtn}
        >
          <span>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          {product.liked === 1 ? "찜 했어요!" : "찜 하기"}
        </MMMButton>
        <MMMButton variant={"detailB"} size={"medium"}>
          <FontAwesomeIcon icon={faComments} /> 채팅하기
        </MMMButton>
      </Container>
    )
  );
};
export default ButtonBox;

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;
