import MMMAlert from "components/mmm-alert";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const ProductAlert = ({ open, setOpen, isLike }) => {
  return (
    <Container open={open}>
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
    </Container>
  );
};
export default ProductAlert;

const Container = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  z-index: ${({ open }) => (open ? 100 : -100)};
  position: absolute;
  top: 8%;
`;
