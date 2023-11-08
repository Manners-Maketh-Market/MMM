export const formValidate = ({
  email,
  password,
  passwordConfirm,
  nickName,
  phoneNumber,
  location,
}) => {
  let disabled =
    !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
      email
    ) || !/^\d+$/.test(password);

  if (passwordConfirm) {
    disabled =
      disabled ||
      (password !== passwordConfirm &&
        !/^[a-zA-Z0-9]$/.test(nickName) &&
        !/^[0-9]+${,11}/.test(phoneNumber));
  } else if (!password && !passwordConfirm) {
    disabled =
      disabled ||
      (!/^[a-zA-Z0-9]$/.test(nickName) &&
        !/^[0-9]+${,11}/.test(phoneNumber) &&
        !/^[ㄱ-ㅣ가-힣]+$/.test(location));
  }

  let errors = {
    email:
      !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "이메일 양식을 확인해주세요",
    password:
      !/^[a-z0-9]+$/.test(password) && "비밀번호는 영문과 숫자만 입력해주세요",
    passwordConfirm:
      password !== passwordConfirm && "비밀번호가 일치하지 않습니다",
    nickName:
      !/^[a-zA-Z0-9]+$/.test(nickName) &&
      "아이디는 영문과 숫자만 사용 가능합니다",
    phoneNumber:
      !/^[0-9]+${,11}/.test(phoneNumber) && "11자리의 숫자만 입력 가능합니다",
    location:
      !/^[ㄱ-ㅣ가-힣]+$/.test(location) &&
      "한글만 입력 가능합니다, 한국 주소를 입력해주세요",
  };

  let access = {
    email:
      /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "사용 가능한 이메일입니다",
    password: /^\d+$/.test(password) && "사용 가능한 비밀번호입니다",
    passwordConfirm:
      password === passwordConfirm && "비밀번호가 확인되었습니다",
    nickName: /^[a-zA-Z0-9]+$/.test(nickName) && "사용 가능한 아이디입니다",
    phoneNumber: /^[0-9]+${,11}/.test(phoneNumber) && "", // 원래는 본인 인증을 통해야 하는데..!
    location: /^[ㄱ-ㅣ가-힣]+$/.test(location) && "",
  };

  return { disabled, errors, access };
};
