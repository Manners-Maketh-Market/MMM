import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import SignInForm from "./components/signIn-form";
import UseNavigation from "hooks/use-navigation";

export const LoginPage = () => {
  // onClick Logo -> back to Home
  const { goToLoginPage } = UseNavigation();

  const OnBackToMain = () => {
    goToLoginPage();
  };

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
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100vh - 80px);
  ${flexCenter}
  flex-direction: column;
  & > button:first-of-type {
    margin: 100px 0 12px;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700 px;
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

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 150px;
    height: 60px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 180px;
    height: 90px;
  }
`;

const Form = styled.div`
  margin-top: 24%;
  width: 100%;
  height: fit-content;
  ${flexCenter}
`;
