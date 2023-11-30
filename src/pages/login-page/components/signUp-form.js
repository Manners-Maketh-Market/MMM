import { FormValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";
import Phone from "./phone";
import Location from "./location";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Api } from "apis";
import { useRecoilState } from "recoil";
import { isEmailCheckPass, isNickNameCheckPass } from "store";
import { useAuth } from "provider/auth-provider";

const SignUpForm = () => {
  // onClick LogoImage, goBack to LoginPage
  const navigate = useNavigate();

  const { SignUp } = useAuth();

  // duplicate check
  const [isEmailCheckPassState, setIsEmailCheckPassState] =
    useRecoilState(isEmailCheckPass);
  const [isNickNameCheckPassState, setIsNickNameCheckPassState] =
    useRecoilState(isNickNameCheckPass);

  const onClickSignIn = () => {
    navigate("/sign-in");
  };

  // input - hook func.
  const [{ email, pw, pwConfirm, nickName, phone, region }, onChangeInputs] =
    useInputs({
      email: "",
      pw: "",
      pwConfirm: "",
      nickName: "",
      phone: "",
      region: "",
    });

  // validation check
  const { disabled, errors, access } = FormValidate({
    email,
    pw,
    pwConfirm,
    nickName,
    phone,
    region,
  });

  // 회원 가입 요청 post
  const mutation = useMutation((signupUserData) =>
    Api.postSignUpData(signupUserData)
  );

  // check email duplicate
  const onCheckEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.getCheckEmail(email);
      setIsEmailCheckPassState(true);
      alert(res.data.message);
    } catch {
      setIsEmailCheckPassState(false);
      alert("중복된 이메일입니다.");
    }
  };

  // check nickName duplicate
  const onCheckNickName = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.getCheckNickName(nickName);
      setIsNickNameCheckPassState(true);
      alert(res.data.message);
    } catch {
      setIsNickNameCheckPassState(false);
      alert("중복된 닉네임입니다.");
    }
  };

  // sign-up
  const onSubmitSignUp = async (e) => {
    e.preventDefault();

    const signupUserData = {
      email: e.target.email.value,
      pw: e.target.pw.value,
      nickName: e.target.nickName.value,
      phone: e.target.phone.value,
      region: e.target.location.value,
    };

    try {
      //const newUser = await mutation.mutateAsync(signupUserData);
      await SignUp(signupUserData);
      navigate("/sign-in");
      alert("환영합니다! 회원 가입이 완료되었습니다!");
    } catch (error) {
      // 이메일 중복
      // 닉네임 중복
      error && alert("양식을 확인 후 다시 시도해주세요");
    }
  };

  return (
    <Wrapper>
      <Logo onClick={onClickSignIn} />
      <Form onSubmit={onSubmitSignUp}>
        <OneRow>
          <MMMInput
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeInputs}
            error={errors.email}
            access={access.email}
            isAvailableEmail={isEmailCheckPassState}
            size={"large"}
            required
          />
          <MMMButton size={"confirm"} type="button" onClick={onCheckEmail}>
            중복확인
          </MMMButton>
        </OneRow>
        <MMMInput
          label="비밀번호"
          name="pw"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangeInputs}
          error={errors.pw}
          access={access.pw}
          size={"full"}
          maxLength={12}
          required
        />
        <MMMInput
          label="비밀번호 확인"
          name="pwConfirm"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.pwConfirm}
          access={access.pwConfirm}
          onChange={onChangeInputs}
          size={"full"}
          required
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
            isAvailableNickName={isNickNameCheckPassState}
            size={"large"}
            maxLength={12}
            required
          />
          <MMMButton size={"confirm"} type="button" onClick={onCheckNickName}>
            중복확인
          </MMMButton>
        </OneRow>
        <Phone name="phone" />
        <Location name="region" />
        <MMMButton size={"full"} type="submit">
          회원가입
        </MMMButton>
        {/* <MMMButton size={"full"} disabled={disabled} type="submit">
          회원가입
        </MMMButton> */}
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
