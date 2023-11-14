export const formValidate = ({
  email,
  pw,
  pwConfirm,
  nickName,
  phone,
  region,
}) => {
  let disabled =
    !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
      email
    ) || !/^\d+$/.test(pw);

  if (pwConfirm) {
    disabled =
      disabled ||
      (pw !== pwConfirm &&
        !/^[a-zA-Z0-9]$/.test(nickName) &&
        !/^[0-9]+${,11}/.test(phone));
  } else if (!pw && !pwConfirm) {
    disabled =
      disabled ||
      (!/^[a-zA-Z0-9]$/.test(nickName) &&
        !/^[0-9]+${,11}/.test(phone) &&
        !/^[ㄱ-ㅣ가-힣]+$/.test(region));
  }

  let errors = {
    email:
      !/^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "이메일 양식을 확인해주세요",
    pw: !/^[a-z0-9]+$/.test(pw) && "비밀번호는 영문과 숫자만 입력해주세요",
    pwConfirm: pw !== pwConfirm && "비밀번호가 일치하지 않습니다",
    nickName:
      !/^[a-zA-Z0-9]+$/.test(nickName) &&
      "아이디는 영문과 숫자만 사용 가능합니다",
    phone: !/^[0-9]+${,11}/.test(phone) && "11자리의 숫자만 입력 가능합니다",
    region:
      !/^[ㄱ-ㅣ가-힣]+$/.test(region) &&
      "한글만 입력 가능합니다, 한국 주소를 입력해주세요",
  };

  let access = {
    email:
      /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/.test(
        email
      ) && "사용 가능한 이메일입니다",
    pw: /^\d+$/.test(pw) && "사용 가능한 비밀번호입니다",
    pwConfirm: pw === pwConfirm && "비밀번호가 확인되었습니다",
    nickName: /^[a-zA-Z0-9]+$/.test(nickName) && "사용 가능한 아이디입니다",
    phone: /^[0-9]+${,11}/.test(phone) && "", // 원래는 본인 인증을 통해야 하는데..!
    region: /^[ㄱ-ㅣ가-힣]+$/.test(region) && "",
  };

  return { disabled, errors, access };
};
