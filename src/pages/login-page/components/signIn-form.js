import { useLocation, useNavigate } from "react-router-dom";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useAuth } from "provider/authProvider";
import { user } from "store";
import { isLogin } from "store";
import { useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { PRODUCT_QUERY_KEY } from "consts";
import { Api } from "apis";

const SignInForm = () => {
  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });
  const { disabled, errors } = formValidate({ email, password });
  const navigate = useNavigate();

  const { data: signupData } = useQuery(
    [PRODUCT_QUERY_KEY.SIGNUP_DATA],
    () => Api.getsignUserData()
  );

  // 직접 로그인 페이지로 온 경우
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";

  // const { signIn } = useAuth();
  const setUser = useSetRecoilState(user);
  const setIsLogin = useSetRecoilState(isLogin);

  const onSubmitSignIn = async (e) => {
    e.preventDefault();

    try {
      const signupUserData = {
        email : e.target.email.value,
        password : e.target.password.value,
      };
      setUser(signupData);
      setIsLogin(false);
      console.log(signupData);
      navigate("/");
      alert("환영합니다! 로그인이 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  //   try {
  //     const loggedInUser = await signIn({ email, password });
  //     setUser(loggedInUser);
  //     setIsLogin(true);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
