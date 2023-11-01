import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useState } from "react";
import SignInForm from "./components/signIn-form";
import SignUpForm from "./components/signUp-form";
import MMMButton from "components/button";


export const LoginPage = () => {
  const [isFormLogin, setIsFormLogin] = useState(true);

  const onChangeForm = (e) => {
    const { innerText } = e.target;
    if (innerText === "로그인") return setIsFormLogin(true);
    return setIsFormLogin(false);
  };

  return (
    <Wrapper>
      <Logo />
      <Form>
        {isFormLogin ? (
          <SignInForm />
        ) : (
          <SignUpForm setIsFormLogin={setIsFormLogin} />
        )}
      </Form>
      <ButtonBox>
        <MMMButton
          isFormLogin={isFormLogin}
          onClick={onChangeForm}
          size={"full"}
        >
          로그인
        </MMMButton>
        <MMMButton
          isFormLogin={isFormLogin}
          onClick={onChangeForm}
          size={"full"}
        >
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
  width: 258px;
  height: 102px;
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


// 조건에 따라 폼태그 보여주는 것
// https://velog.io/@sseung95/React-%EC%A1%B0%EA%B1%B4%EC%97%90-%EB%94%B0%EB%9D%BC-%ED%8F%BC%ED%83%9C%EA%B7%B8-%EB%B3%B4%EC%97%AC%EC%A3%BC%EA%B3%A0-%EC%88%A8%EA%B8%B0%EA%B8%B0-feat.-%ED%81%B4%EB%A6%AD-%EC%9D%B4%EB%B2%A4%ED%8A%B8
// 좀만 더 적용해보면 될듯한데...