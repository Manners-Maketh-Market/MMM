import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SignInForm from "./components/signIn-form";

export const LoginPage = () => {
  return (
    <Wrapper>
      <Logo />
      <Form>
        <SignInForm />
      </Form>
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
