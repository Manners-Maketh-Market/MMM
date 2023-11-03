import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SignInForm from "./components/signIn-form";
import MMMButton from "components/button";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Wrapper>
      <Logo />
      <Form>
        <SignInForm />
      </Form>
      <ButtonBox>
        <MMMButton size={"full"}>로그인</MMMButton>
        <MMMButton size={"full"} onClick={onClickSignUp}>
          회원가입
        </MMMButton>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  ${flexCenter}
  flex-direction: column;
  overflow-y: scroll;

  & > button:first-of-type {
    margin: 100px 0 12px;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 180px;
  width: 230px;
  height: 90px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../MMMlogo.png");
`;

const Form = styled.div`
  margin-top: 24%;
  width: 100%;
  height: fit-content;
  ${flexCenter}
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  & > button {
    margin-bottom: 12px;
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
  }

  & > button:first-of-type {
    background: #282190;
    color: #fff;
  }
`;
