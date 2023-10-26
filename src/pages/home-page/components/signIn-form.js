import { useNavigate } from "react-router-dom";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";

const SignInForm = () => {
  const navigate = useNavigate();
  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });

  const { disabled, errors } = formValidate({ email, password });

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    if (email === "test@test.com" && password === "test") {
      return navigate("/todo");
    }
    alert("아이디와 비밀번호를 다시 한번 확인해주세요");
  };

  return (
    <form onSubmit={onSubmitSignIn}>
      <MMMInput
        label="이메일"
        type="text"
        name="email"
        onChange={onChangeInputs}
        placeholder="이메일을 입력해주세요"
        error={errors.email}
      />
      <MMMInput
        label="비밀번호"
        type="password"
        name="password"
        onChange={onChangeInputs}
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
      />
      <MMMButton disabled={disabled}>로그인</MMMButton>
    </form>
  );
};
export default SignInForm;
