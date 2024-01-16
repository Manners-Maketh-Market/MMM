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
  let disabled = !REGEXP.email.test(email) || !REGEXP.pw.test(pw);
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
    pw: !REGEXP.pw.test(pw) && ERROR.pw,
    pwConfirm: pw !== pwConfirm && ERROR.pwConfirm,
    nickName: !REGEXP.nickName.test(nickName) && ERROR.nickName,
    phone: !REGEXP.phone.test(phone) && ERROR.phone,
    region: !REGEXP.region.test(region) && ERROR.region,
    title: !REGEXP.nickName.test(title) && ERROR.postTitle,
  };

  let access = {
    email: REGEXP.email.test(email) && ACCESS.email,
    pw: REGEXP.pw.test(pw) && ACCESS.pw,
    pwConfirm: pw === pwConfirm && ACCESS.pwConfirm,
    nickName: REGEXP.nickName.test(nickName) && ACCESS.nickName,
    phone: REGEXP.phone.test(phone) && ACCESS.phone,
    region: REGEXP.region.test(region) && ACCESS.region,
  };

  return { disabled, errors, access };
};
