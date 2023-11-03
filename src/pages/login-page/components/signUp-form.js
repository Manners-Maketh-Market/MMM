import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";
import Phone from "./phone";
import Location from "./location";
import { flexCenter } from "styles/common.style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  // goBack to LoginPage, onClick Logo image
  const navigate = useNavigate();
  const onClickSignIn = () => {
    navigate("/sign-in");
  };

  // onSuccess
  const onSubmitSignUp = (e) => {
    // e.preventDefault();
    alert("회원가입이 되었습니다. 축하합니다.");
    navigate("/sign-in");
  };

  // custom-hook
  const [{ email, password, passwordConfirm, nickName }, onChangeInputs] =
    useInputs({
      email: "",
      password: "",
      passwordConfirm: "",
      nickName: "",
    });
  // form validate check
  const { disabled, errors } = formValidate({
    email,
    password,
    passwordConfirm,
    nickName,
  });

  // react-hook-form library
  const { register, required, handleSubmit, trigger } = useForm();

  return (
    <Wrapper>
      <Logo onClick={onClickSignIn} />
      <Form onSubmit={handleSubmit(onSubmitSignUp)}>
        <OneRow>
          <MMMInput
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeInputs}
            error={errors.email}
            size={"large"}
          />
          <MMMButton size={"confirm"}>중복확인</MMMButton>
        </OneRow>
        <OneRow>
          <MMMInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeInputs}
            error={errors.password}
            maxLength={20}
            size={"full"}
          />
        </OneRow>
        <OneRow>
          <MMMInput
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            error={errors.passwordConfirm}
            onChange={onChangeInputs}
            size={"full"}
          />
        </OneRow>
        <OneRow>
          <MMMInput
            label="닉네임"
            name="nickName"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={onChangeInputs}
            error={errors.nickName}
            size={"large"}
          />
          <MMMButton size={"confirm"}>중복확인</MMMButton>
        </OneRow>
        <OneRow>
          <Phone />
        </OneRow>
        <Location />
        <MMMButton size={"full"} disabled={disabled} onClick={onSubmitSignUp}>
          회원가입
        </MMMButton>
      </Form>
    </Wrapper>
  );
};
export default SignUpForm;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  ${flexCenter}
  flex-direction: column;
  overflow-y: scroll;
`;
const Logo = styled.div`
  position: absolute;
  top: 180px;
  width: 230px;
  height: 90px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../MMMlogo.png");
`;
const Form = styled.form`
  margin-top: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  & > button {
    margin: 100px 0;
  }
`;
const OneRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  & > button {
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
    margin-top: 20px;
  }
`;
