import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { Api } from "apis";
import AuthApi from "apis/auth";
import { FormValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import Phone from "./phone";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import ProductOrder from "./location2";
import { useState } from "react";
import MMMAlert from "components/mmm-alert";
import { useAuth } from "context/auth.ctx";
import {
  isEmailCheckPass,
  isNickNameCheckPass,
} from "store/registration-state";
import UseNavigation from "hooks/use-navigation";

const SignUpForm = () => {
  // alert
  const [open, setOpen] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const { goToLoginPage } = UseNavigation();
  const { SignUp } = useAuth();

  // duplicate check
  const [isCheckedEmail, setIsCheckedEmail] = useRecoilState(isEmailCheckPass);
  const [isCheckedNickName, setIsCheckedNickName] =
    useRecoilState(isNickNameCheckPass);

  const onClickSignIn = () => {
    goToLoginPage();
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
  const { errors, access } = FormValidate({
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
    setIsCategory(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const res = await AuthApi.getCheckEmail(email);
      setIsCheckedEmail(true);
      setOpen(true);
    } catch {
      setIsCheckedEmail(false);
      setOpen(true);
    }
  };

  // check nickName duplicate
  const onCheckNickName = async (e) => {
    e.preventDefault();
    setIsCategory(false);
    try {
      const res = await AuthApi.getCheckNickName(nickName);
      setIsCheckedNickName(true);
      setOpen(true);
    } catch {
      setIsCheckedNickName(false);
      setOpen(true);
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
      region: e.target.region.value,
    };

    try {
      await SignUp(signupUserData);
      alert("환영합니다! 회원가입이 완료되었습니다!");
      goToLoginPage();
    } catch (error) {
      alert("회원가입이 정상적으로 이뤄지지 못했습니다!");
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
            isAvailableEmail={isCheckedEmail}
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
            isAvailableNickName={isCheckedNickName}
            size={"large"}
            maxLength={12}
            required
          />
          <MMMButton size={"confirm"} type="button" onClick={onCheckNickName}>
            중복확인
          </MMMButton>
        </OneRow>
        <Phone name="phone" />
        <ProductOrder name="region" />
        <MMMButton size={"full"} type="submit">
          회원가입
        </MMMButton>
      </Form>
      <AlertPosition open={open}>
        <MMMAlert
          size={"md"}
          color={
            isCategory && isCheckedEmail
              ? "success"
              : isCategory && !isCheckedEmail
              ? "error"
              : !isCategory && isCheckedNickName
              ? "success"
              : !isCategory && !isCheckedNickName
              ? "error"
              : (!isCheckedEmail || !isCheckedNickName) && "warning"
          }
          severity={
            isCategory && isCheckedEmail
              ? "success"
              : isCategory && !isCheckedEmail
              ? "error"
              : !isCategory && isCheckedNickName
              ? "success"
              : !isCategory && !isCheckedNickName
              ? "error"
              : (!isCheckedEmail || !isCheckedNickName) && "warning"
          }
          MessageTitle={
            isCategory && isCheckedEmail
              ? "Confirm"
              : isCategory && !isCheckedEmail
              ? "Duplicated"
              : !isCategory && isCheckedNickName
              ? "Confirm"
              : !isCategory && !isCheckedNickName
              ? "Duplicated"
              : (!isCheckedEmail || !isCheckedNickName) && "Check Duplicate"
          }
          AlertMessage={
            isCategory && isCheckedEmail
              ? "사용가능한 이메일입니다."
              : isCategory && !isCheckedEmail
              ? "이미 사용 중인 이메일입니다."
              : !isCategory && isCheckedNickName
              ? "사용가능한 닉네임 입니다"
              : !isCategory && !isCheckedNickName
              ? "중복된 닉네임 입니다."
              : (!isCheckedEmail || !isCheckedNickName) &&
                "이메일과 닉네임의 중복 여부를 확인해주세요."
          }
          open={open}
          setOpen={setOpen}
        />
      </AlertPosition>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  width: 90%;
  height: 100vh;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  ${flexCenter}
  flex-direction: column;
  overflow-x: hidden;
`;
const Logo = styled.div`
  position: absolute;
  top: 60px;
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
  top: 200px;
  ${flexCenter}
  flex-direction: column;

  & > button {
    min-width: 918px;
    min-height: 46px;
    margin-top: 60px;
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

const AlertPosition = styled.div`
  width: 100%;
  height: 100px;
  ${flexCenter}
  z-index: ${({ open }) => (open ? 100 : -10)};
  position: sticky;
  margin-top: -40%;
`;
