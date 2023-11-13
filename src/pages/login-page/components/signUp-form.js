import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";
import Phone from "./phone";
import Location from "./location";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "provider/authProvider";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, isLoginSelector } from "Recoil/TokenAtom";

const SignUpForm = ({ setIsFormLogin }) => {
  // goBack to LoginPage, onClick Logo image
  const navigate = useNavigate();
  const onClickSignIn = () => {
    navigate("/sign-in");
  };

  const [{ email, password, passwordConfirm, nickName }, onChangeInputs] =
    useInputs({
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
    });
  const { disabled, errors, access } = formValidate({
    email,
    password,
    passwordConfirm,
    nickName,
  });

  // const { signUp } = useAuth();
  const setAccessToken = useSetRecoilState(TokenAtom);
  const isLogin = useRecoilValue(isLoginSelector);

  // onSuccess
  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      // await signUp({ email, password, nickName }); setIsFormLogin(true);
      axios.post("/user/login", { id: email, pw: password }).then((res) => {
        setAccessToken(res.data.accessToken);
        isLogin(true);
      });
      alert("회원가입이 되었습니다. 축하합니다.");
      navigate("/sign-in"); // 회원가입과 동시에 로그인, 혹은 회원가입 후 로그인 창으로 보내기?
    } catch {
      alert("회원가입이 정상적으로 이루어지지 않았습니다, 죄송합니다.");
    }
  };

  return (
    <Wrapper>
      <Logo onClick={onClickSignIn} />
      <Form>
        <OneRow>
          <MMMInput
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeInputs}
            error={errors.email}
            access={access.email}
            size={"large"}
          />
          <MMMButton size={"confirm"} type="button">
            중복확인
          </MMMButton>
        </OneRow>
        <MMMInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangeInputs}
          error={errors.password}
          access={access.password}
          size={"full"}
          maxLength={12}
        />
        <MMMInput
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          onChange={onChangeInputs}
          size={"full"}
        />
        <OneRow>
          <MMMInput
            label="닉네임"
            name="nickName"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={onChangeInputs}
            error={errors.nickName}
            access={access.nickName}
            size={"large"}
            maxLength={10}
          />
          <MMMButton size={"confirm"} type="button">
            중복확인
          </MMMButton>
        </OneRow>
        <Phone />
        <Location />
        <MMMButton
          size={"full"}
          disabled={disabled}
          type="submit"
          onClick={onSubmitSignUp}
        >
          회원가입
        </MMMButton>
      </Form>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  position: relative;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: calc(100vh - 80px);
  ${flexCenter}
  flex-direction: column;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Logo = styled.div`
  position: absolute;
  top: 0;
  width: 230px;
  height: 90px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../MMMlogo.png");

  // mediaQuery - logo image
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 150px;
    height: 60px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 180px;
    height: 90px;
  }
`;

const Form = styled.form`
  position: absolute;
  top: 180px;
  ${flexCenter}
  flex-direction: column;

  & > button {
    min-width: 918px;
    min-height: 46px;
    margin: 100px 0;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;

    & > div {
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
    & > button {
      min-width: 200px;
      min-height: 38px;
      border-radius: 4px;
      font-size: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    ${flexCenter}
    max-width: 400px;

    & > div {
      & > input {
        min-width: 320px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
        margin-right: -10px;
      }
      & > label,
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      min-width: 320px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    ${flexCenter}
    max-width: 700px;

    & > div {
      & > input {
        min-width: 620px;
        min-height: 48px;
        margin-right: -10px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > label,
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
    & > button {
      min-width: 620px;
      min-height: 46px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;

const OneRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;

  & > button {
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
    margin-top: 20px;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;

    & > div {
      & > input {
        min-width: 150px;
        min-height: 38px;
        border-radius: 4px;
        font-size: 10px;
      }
      & > label,
      & > p {
        font-size: 10px;
      }
    }
    & > button {
      min-width: 38px;
      min-height: 38px;
      font-size: 10px;
      margin-left: 6px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;

    & > div {
      & > input {
        min-width: 240px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
        margin-left: 10px;
      }
      & > label,
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      min-width: 70px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700px;

    & > div {
      & > input {
        min-width: 466px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
        margin-left: 10px;
      }
      & > label,
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
    & > button {
      min-width: 140px;
      margin-left: 10px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;
