import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";
import Phone from "./phone";
import Location from "./location";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { isLogin } from "store";
import { useSetRecoilState } from "recoil";
import { user } from "store";
import { useMutation, useQuery } from "react-query";
import { Api } from "apis";

const SignUpForm = () => {
  // onClick LogoImage, goBack to LoginPage
  const navigate = useNavigate();
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
  const { disabled, errors, access } = formValidate({
    email,
    pw,
    pwConfirm,
    nickName,
    phone,
    region,
  });

  const setUser = useSetRecoilState(user);
  const setIsLogin = useSetRecoilState(isLogin);

  const { mutate, data: signUpRes } = useMutation((signupUserData) =>
    Api.postSignUpData(signupUserData)
  );

  const {
    data: checkEmailData,
    isError,
    refetch,
  } = useQuery(["checkEmail"], () => Api.getCheckEmail(email));
  checkEmailData && console.log("checkEmailData >> ", checkEmailData);

  // check email duplicate
  const onCheckEmail = (e) => {
    e.preventDefault();
    refetch();

    // axios 에러 캐치 하는 법을 알아야 할 거 같아요
    // 1번 클릭하면 3번 요청이 감. 1번 더 클릭하면 그제서야 중복 확인이 제대로 이뤄짐
    if (isError) {
      alert("이미 가입된 이메일입니다.");
      // value 비우기
      // checkEmailData.value = "";
    } else if (!isError) {
      alert(checkEmailData.data.message);
    }
  };

  // sign-up
  const onSubmitSignUp = (e) => {
    e.preventDefault();

    const signupUserData = {
      email: e.target.email.value,
      pw: e.target.pw.value,
      nickName: e.target.nickName.value,
      phone: e.target.phone.value,
      region: e.target.location.value,
    };
    // const signupData = JSON.stringify(signupUserData);
    mutate(signupUserData);

    try {
      // required
      if (!email || !pw || !pwConfirm || !nickName) {
        alert("내용을 전부 입력해주세요");
        return;
      } else {
        setIsLogin(true);
        setUser(signupUserData);
        navigate("/sign-in");
        alert("환영합니다! 회원 가입이 완료되었습니다!");
      }
    } catch (error) {
      error && alert("회원가입하실 수 없습니다.");
    }
  };

  signUpRes && console.log(signUpRes);

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
            size={"large"}
            maxLength={10}
            required
          />
          <MMMButton size={"confirm"} type="button">
            중복확인
          </MMMButton>
        </OneRow>
        <Phone name="phone" />
        <Location name="region" />
        <MMMButton size={"full"} disabled={disabled} type="submit">
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
