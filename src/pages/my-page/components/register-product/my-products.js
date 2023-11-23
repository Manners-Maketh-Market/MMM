import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MMMButton from "components/button";
import { useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";

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

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    min-height: 400px;
    & > p {
      font-size: 10px;
    }
    & > button {
      font-size: 10px;
      width: 140px;
      height: 40px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    & > p {
      font-size: 12px;
    }
    & > button {
      font-size: 12px;
      width: 180px;
      height: 46px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    & > p {
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
    & > button {
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      width: 230px;
      height: 50px;
    }
  }
`;
