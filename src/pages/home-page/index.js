import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useState } from "react";
import SignInForm from "./components/signIn-form";
import SignUpForm from "./components/signUp-form";
import MMMButton from "components/button";

export const HomePage = () => {
  const [isFormLogin, setIsFormLogin] = useState(true);

  const onChangeForm = (e) => {
    const { innerText } = e.target;
    if (innerText === "SIGN-IN") return setIsFormLogin(true);
    return setIsFormLogin(false);
  };

  return (
    <Wrapper>
      <Logo>logo 위치</Logo>
      {isFormLogin ? (
        <SignInForm />
      ) : (
        <SignUpForm setIsFormLogin={setIsFormLogin} />
      )}
      <Header>
        <MMMButton isFormLogin={isFormLogin} onClick={onChangeForm}>
          로그인
        </MMMButton>
        <MMMButton isFormLogin={isFormLogin} onClick={onChangeForm}>
          회원가입
        </MMMButton>
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter}
  flex-direction: column;
`;

const Logo = styled.div``;

const Header = styled.header`
  width: 360px;
  height: 48px;
  position: relative;
  display: flex;

  & > div {
    width: 50%;
    ${flexCenter}
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;
