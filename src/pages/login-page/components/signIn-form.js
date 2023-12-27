import { useNavigate } from "react-router-dom";
import useInputs from "hooks/use-inputs";
import { FormValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useAuth } from "provider/auth-provider";
import { useSocket } from "socket/socket";
import LoginUserNickNameRepository from "repository/login-user-nickName-repository";
import TokenRepository from "repository/token-repository";
import { SocketTokenRepository } from "repository/socket-token-repository";

const SignInForm = () => {
  const [{ email, pw }, onChangeInputs] = useInputs({
    email: "",
    pw: "",
  });
  const { disabled, errors } = FormValidate({ email, pw });

  const navigate = useNavigate();
  const { SignIn } = useAuth();

  const onSubmitSignIn = async (e) => {
    e.preventDefault();

    const loginUserData = {
      email: e.target.email.value,
      pw: e.target.pw.value,
    };

    try {
      const res = await SignIn(loginUserData);

      LoginUserNickNameRepository.setUserNickName(res.user.nickName);
      SocketTokenRepository.setToken(res.user.token);
      alert("반갑습니다^^");
      window.location.replace("/MMM/home");
    } catch (error) {
      error && alert("이메일과 비밀번호를 확인해주세요");
    }
  };

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
    left: 50%;
    transform: translateX(-50%);

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
