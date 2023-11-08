import { useLocation, useNavigate } from "react-router-dom";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "Recoil/TokenAtom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "provider/authProvider";

const SignInForm = () => {

  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });
  const { disabled, errors } = formValidate({ email, password });
  const navigate = useNavigate();

  const setAccessToken = useSetRecoilState(TokenAtom);
  const isLogin = useRecoilValue(isLoginSelector);

  // 직접 로그인 페이지로 온 경우
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";

  // // sign-in button > login
  // const onSubmitSignIn = async (e) => {
  //   e.preventDefault();

  //   // await signIn({ email, password });
  //   axios.post("/user/login", { id: email, pw: password }).then((res) => {
  //     setAccessToken(res.data.accessToken);
  //     navigate(from);
  //   });

  //   // if (email === "test@test.com" && password === "test") {return navigate("/");}
  //   // alert("아이디와 비밀번호를 다시 한번 확인해주세요");
  // };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    if (email === "test@test.com" && password === "test") {
      return navigate("/");
    }
    alert("아이디와 비밀번호를 다시 한번 확인해주세요");
  };

  // sign-up button
  const onClickSignUp = () => {
    navigate("/sign-up");

  };

  return (
    <Form onSubmit={onSubmitSignIn}>
      <MMMInput
        label="이메일"
        type="text"
        name="email"
        onChange={onChangeInputs}
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        size={"full"}
      />
      <MMMInput
        label="비밀번호"
        type="password"
        name="password"
        onChange={onChangeInputs}
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        size={"full"}
      />
      <ButtonBox>
        <MMMButton size={"full"} disabled={disabled} variant={"secondary"}>
          로그인
        </MMMButton>
        <MMMButton
          size={"full"}
          variant={"secondary"}
          type="button"
          onClick={onClickSignUp}
        >
          회원가입
        </MMMButton>
      </ButtonBox>
    </Form>
  );
};
export default SignInForm;

const Form = styled.form`
  position: absolute;
  top: 40%;

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    top: 29%;
    left: 0%;
    margin-left: 20px;

    & > div {
      padding-bottom: 16px;
      & > input {
        min-width: 200px;
        min-height: 38px;
        border-radius: 4px;
        font-size: 10px;
      }
      & > label {
        font-size: 10px;
      }
      & > p {
        font-size: 10px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    top: 36%;
    left: 0%;
    margin-left: 40px;

    & > div {
      & > input {
        min-width: 320px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
      }
      & > label {
        font-size: 12px;
      }
      & > p {
        font-size: 12px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    left: 0%;
    margin-left: 40px;

    & > div {
      & > input {
        min-width: 620px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > label {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
  }
`;

const ButtonBox = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin: 95px 0;
  & > button {
    margin: 5px 0;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    margin: 40px 0;

    & > button {
      min-width: 200px;
      min-height: 38px;
      border-radius: 4px;
      font-size: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    margin: 65px 0;

    & > button {
      min-width: 320px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    margin: 75px 0;

    & > button {
      min-width: 620px;
      min-height: 48px;
    }
  }
`;

