import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";

const SignUpForm = ({ setIsFormLogin }) => {
  const onSubmitSignUp = (e) => {
    e.preventDefault();
    alert("회원가입이 되었습니다. 축하합니다");
    setIsFormLogin(true);
  };

  const [
    { email, password, passwordConfirm, nickName, phoneNumber, location },
    onChangeInputs,
  ] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
    phoneNumber: "",
    location: "",
  });

  const { disabled, errors } = formValidate({
    email,
    password,
    passwordConfirm,
    nickName,
    phoneNumber,
    location,
  });

  return (
    <Form onSubmit={onSubmitSignUp}>
      <OneRow>
        <MMMInput
          label="이메일"
          name="email"
          type="text"
          onChange={onChangeInputs}
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          size={"large"}
        />
        <MMMButton size={"confirm"}>중복확인</MMMButton>
      </OneRow>
      <OneRow>
        <MMMInput
          label="비밀번호"
          name="password"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          size={"full"}
        />
      </OneRow>
      <OneRow>
        <MMMInput
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          size={"full"}
        />
      </OneRow>
      <OneRow>
        <MMMInput
          label="닉네임"
          name="nickName"
          type="text"
          onChange={onChangeInputs}
          placeholder="닉네임을 입력해주세요."
          error={errors.nickName}
          size={"large"}
        />
        <MMMButton size={"confirm"}>중복확인</MMMButton>
      </OneRow>
      <OneRow>
        <MMMInput
          label="휴대폰번호"
          name="phoneNumber"
          type="text"
          onChange={onChangeInputs}
          placeholder="휴대폰 번호를 입력해주세요."
          error={errors.phoneNumber}
          size={"full"}
        />
      </OneRow>
      <OneRow>
        <MMMInput
          label="지역선택"
          name="location"
          type="text"
          onChange={onChangeInputs}
          placeholder="검색 버튼을 눌러주세요."
          size={"large"}
        />
        <MMMButton size={"confirm"}>중복확인</MMMButton>
      </OneRow>
    </Form>
  );
};
export default SignUpForm;

const Form = styled.form`
  height: 730px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
