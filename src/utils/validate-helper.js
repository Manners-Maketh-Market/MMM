export const formValidate = ({
  email,
  password,
  passwordConfirm,
  nickName,
}) => {
  let disabled =
    !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
      email
    ) ||
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
      password
    ) ||
    !passwordConfirm ||
    !nickName;

  if (passwordConfirm) {
    disabled = disabled || password !== passwordConfirm;
  }

  let errors = {
    email:
      !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "이메일 양식을 확인해주세요",
    // password가 8자리 이상이 되어도 errorMessage가 안 없어지네요..!
    password: password.length < 8 && "비밀번호는 8자 이상으로 입력해 주세요",
    passwordConfirm: password !== passwordConfirm && "비밀번호를 확인해주세요",
    nickName: nickName.length > 11 && "닉네임은 10자 이하로 지어주세요",
  };

  return { disabled, errors };
};
