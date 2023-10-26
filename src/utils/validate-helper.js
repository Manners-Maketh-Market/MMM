export const formValidate = ({
  email,
  password,
  passwordConfirm,
  nickName,
}) => {
  let disabled = !email.includes("@") || password.length < 8;

  if (passwordConfirm) {
    disabled = disabled || password !== passwordConfirm;
  }

  let errors = {
    email: !email.includes("@") && "이메일 양식을 확인해주세요",
    password: password.length < 8 && "비밀번호는 8자리 이상이어야합니다",
    passwordConfirm: password !== passwordConfirm && "비밀번호를 확인해주세요",
    // nickName: nickName.length > 10 && "닉네임은 10자리까지만 가능합니다.",
    // phoneNumber:
    // 번호만 입력하면 슬래쉬가 자동으로 입력되게 하기
  };

  return { disabled, errors };
};
