import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MMMButton from "components/button";

const RegisteredProducts = () => {
  const navigate = useNavigate();
  const registerForm = () => {
    navigate("/my-page/registerProductForm");
  };

  return (
    <Wrapper>
      <p>등록된 상품이 없습니다.</p>
      <MMMButton onClick={registerForm} variant={"secondary"} size={"medium"}>
        물품 등록하기
      </MMMButton>
    </Wrapper>
  );
};
export default RegisteredProducts;

const Wrapper = styled.div`
  & > p {
    text-align: center;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.COLORS.gray[400]};
    font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  }
`;
