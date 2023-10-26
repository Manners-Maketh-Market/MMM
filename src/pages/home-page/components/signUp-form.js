import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";

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
    <form onSubmit={onSubmitSignUp}>
      <MMMInput
        label="이메일"
        name="email"
        type="text"
        onChange={onChangeInputs}
        placeholder="이메일을 입력해주세요"
        error={errors.email}
      />
      <MMMInput
        label="비밀번호"
        name="password"
        type="password"
        onChange={onChangeInputs}
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
      />
      <MMMInput
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        onChange={onChangeInputs}
        placeholder="비밀번호 확인"
        error={errors.passwordConfirm}
      />
      <MMMInput
        label="닉네임"
        name="nickName"
        type="text"
        onChange={onChangeInputs}
        placeholder="닉네임을 입력해주세요."
        error={errors.nickName}
      />
      <MMMInput
        label="휴대폰번호"
        name="phoneNumber"
        type="text"
        onChange={onChangeInputs}
        placeholder="휴대폰 번호를 입력해주세요."
        error={errors.phoneNumber}
      />

      <MMMInput
        label="지역선택"
        name="location"
        type="text"
        onChange={onChangeInputs}
        placeholder="검색 버튼을 눌러주세요."
      />
      <MMMButton disabled={disabled}>회원가입</MMMButton>
    </form>
  );
};
export default SignUpForm;
