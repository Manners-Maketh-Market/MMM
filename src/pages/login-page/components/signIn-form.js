import { useLocation, useNavigate } from "react-router-dom";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { user } from "store";
import { isLogin } from "store";
import { useSetRecoilState } from "recoil";
import { Api } from "apis";
import { useMutation } from "react-query";
import { TokenAtom } from "Recoil/TokenAtom";

const SignInForm = () => {
  const [{ email, pw }, onChangeInputs] = useInputs({
    email: "",
    pw: "",
  });
  const { disabled, errors } = formValidate({ email, pw });
  const navigate = useNavigate();

  // 직접 로그인 페이지로 온 경우
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";

  const setUser = useSetRecoilState(user);
  const setIsLogin = useSetRecoilState(isLogin);
  const setAccessToken = useSetRecoilState(TokenAtom);

  const {
    mutate,
    data: signInRes,
    status,
  } = useMutation((loginUserData) => Api.postLoginUserData(loginUserData));
  console.log("status", status);
  const onSubmitSignIn = (e) => {
    e.preventDefault();

    const loginUserData = {
      email: e.target.email.value,
      pw: e.target.pw.value,
    };
    mutate(loginUserData);

    // required
    if (!email || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요");
      return;
    } else if (status === "success") {
      setIsLogin(true);
      setUser(loginUserData);
      // todo: nickName으로 변경하기
      alert(loginUserData.email + "님, 반갑습니다!");
      navigate("/", { replace: true });
      console.log("login success >>", loginUserData);
    }
  };

  signInRes && console.log("signInRes >>", signInRes);

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
        required
      />
      <MMMInput
        label="비밀번호"
        type="password"
        name="pw"
        onChange={onChangeInputs}
        placeholder="비밀번호를 입력해주세요"
        error={errors.pw}
        size={"full"}
        required
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
      & > label,
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
      & > label,
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
      & > label,
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
    min-width: 918px;
    min-height: 46px;
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
