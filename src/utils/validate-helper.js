export const formValidate = ({
  email,
  password,
  passwordConfirm,
  nickName,
}) => {
  let disabled =
    !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
      email
    ) || password.length < 8;

  if (passwordConfirm) {
    disabled =
      disabled ||
      (password !== passwordConfirm && !/^[a-zA-Z0-9]$/.test(nickName));
  }

  let errors = {
    email:
      !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "이메일 양식을 확인해주세요",
    password: password.length < 8 && "비밀번호는 8자 이상으로 입력해 주세요",
    passwordConfirm:
      password !== passwordConfirm && "비밀번호가 일치하지 않습니다",
    nickName:
      !/^[a-zA-Z0-9]$/.test(nickName) &&
      "아이디는 영문과 숫자만 사용 가능합니다",
  };

  let access = {
    email:
      /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "사용 가능한 이메일입니다",
    password: password.length > 8 && "사용 가능한 비밀번호입니다",
    passwordConfirm:
      password === passwordConfirm && "비밀번호가 확인되었습니다",
    nickName: /^[a-zA-Z0-9]$/.test(nickName) && "사용 가능한 아이디입니다",
  };

  return { disabled, errors, access };
};
