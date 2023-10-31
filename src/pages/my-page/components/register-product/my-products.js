import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RegisteredProducts = () => {
  const navigate = useNavigate();
  const registerForm = () => {
    navigate("/my-page/registerProductForm");
  };

  return (
    <Wrapper>
      <button onClick={registerForm}>물품 등록하기</button>
    </Wrapper>
  );
};
export default RegisteredProducts;

const Wrapper = styled.div``;
