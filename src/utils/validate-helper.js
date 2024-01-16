import { ACCESS, ERROR } from "consts/message";
import { REGEXP } from "consts/regexp";

export const FormValidate = ({
  email,
  pw,
  pwConfirm,
  nickName,
  phone,
  region,
  title,
}) => {
  // sign-in
  let disabled = !REGEXP.email.test(email) || !REGEXP.password.test(pw);
  if (pwConfirm) {
    // sign-up
    disabled =
      disabled ||
      (pw !== pwConfirm &&
        !REGEXP.nickName.test(nickName) &&
        !REGEXP.phone.test(phone));
  }

  let errors = {
    email: !REGEXP.email.test(email) && ERROR.email,
    pw: !REGEXP.password.test(pw) && ERROR.password,
    pwConfirm: pw !== pwConfirm && ERROR.passwordConfirm,
    nickName: !REGEXP.nickName.test(nickName) && ERROR.nickName,
    phone: !REGEXP.phone.test(phone) && ERROR.phone,
    region: !REGEXP.region.test(region) && ERROR.region,
    title: !REGEXP.nickName.test(title) && ERROR.postTitle,
  };

  let access = {
    email: REGEXP.email.test(email) && ACCESS.email,
    pw: REGEXP.password.test(pw) && ACCESS.password,
    pwConfirm: pw === pwConfirm && ACCESS.passwordConfirm,
    nickName: REGEXP.nickName.test(nickName) && ACCESS.nickName,
    phone: REGEXP.phone.test(phone) && ACCESS.phone,
    region: REGEXP.region.test(region) && ACCESS.region,
  };

  return { disabled, errors, access };
};
