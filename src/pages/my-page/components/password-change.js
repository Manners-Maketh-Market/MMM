import { useMutation } from "react-query";
import { useState } from "react";
import AuthApi from "apis/auth";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import { FormValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import MMMAlert from "components/mmm-alert";

const ChangePassword = () => {
  // alert
  const [open, setOpen] = useState(false);
  const [cases, setCases] = useState(0);

  const [isDisabled, setIsDisabled] = useState(false);

  // validate check
  const [{ pw, pwConfirm }, onChangeInputs] = useInputs({
    pw: "",
    pwConfirm: "",
  });
  const { errors, access } = FormValidate({
    pw,
    pwConfirm,
  });

  // change password
  const { mutateAsync: mutateChangePassword, data: changePasswordData } =
    useMutation((newPassword) => AuthApi.patchUserPassword(newPassword));

  // patch password
  const onEditPassword = async (e) => {
    e.preventDefault();
    const newPasswordConfirm = e.target.pwConfirm.value;
    const newPassword = e.target.pw.value;
    const patchPassword = {
      pw: newPassword,
    };
    window.scrollTo(0, 0);

    if (newPassword === newPasswordConfirm && newPassword.length >= 4) {
      try {
        await mutateChangePassword(patchPassword);
        setCases(1);
        setOpen(true);
        setTimeout(() => window.location.replace("/MMM/my-page"), 1000);
      } catch (error) {
        setCases(2);
        setOpen(true);
      }
    } else if (newPassword !== newPasswordConfirm) {
      setCases(3);
      setOpen(true);
    } else if (newPassword.length < 4) {
      setCases(4);
      setOpen(true);
    }
  };

  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <Contents onSubmit={onEditPassword}>
        <MMMInput
          label={"새 비밀번호"}
          type="password"
          name="pw"
          size={"editInfo"}
          placeholder="new password"
          onChange={onChangeInputs}
          error={errors.pw}
          access={access.pw}
        />
        <MMMInput
          label={"새 비밀번호 확인"}
          type="password"
          name="pwConfirm"
          size={"editInfo"}
          placeholder="confirm new password"
          onChange={onChangeInputs}
          error={errors.pwConfirm}
          access={access.pwConfirm}
        />
        <MMMButton size={"small"} type="submit" disabled={isDisabled}>
          변경사항 저장
        </MMMButton>
      </Contents>
      <AlertPosition open={open}>
        <MMMAlert
          size={"md"}
          color={cases === 1 ? "success" : cases === 2 ? "error" : "warning"}
          severity={cases === 1 ? "success" : cases === 2 ? "error" : "warning"}
          MessageTitle={
            cases === 1
              ? "Storage Success"
              : cases === 2
              ? "Storage Fail"
              : "Warning"
          }
          AlertMessage={
            cases === 1
              ? "변경사항이 저장되었습니다!"
              : cases === 2
              ? "변경사항이 저장되지 못했습니다!"
              : cases === 3
              ? "비밀번호가 일치하지 않습니다."
              : cases === 4 && "비밀번호를 4자리 이상 입력해주세요."
          }
          open={open}
          setOpen={setOpen}
        />
      </AlertPosition>
    </Wrapper>
  );
};

export default ChangePassword;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 80px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    margin-left: 0px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    margin-left: 0px;
  }
`;

const Title = styled.h1`
  padding: 80px 0;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    font-size: 12px;
    padding: 10px 0 50px 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    margin-left: 10px;
    padding: 0 0 50px;
  }
`;

const Contents = styled.form`
  ${flexAlignCenter}
  flex-direction: column;
  margin-left: 40px;

  & > button {
    margin: 60px 0 100px;
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    align-items: flex-start;
    margin-left: 0px;

    & > div {
      & > input {
        min-width: 240px;
      }
      & > label {
        font-size: 12px;
      }
      & > p {
        font-size: 10px;
      }
    }
    & > button {
      width: 120px;
      margin: 30px 0 60px 25%;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    align-items: flex-start;
    margin-left: 0px;

    & > div {
      & > input {
        min-width: 400px;
      }
      & > label {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      margin: 20px 0 0 23%;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    align-items: flex-start;
    margin-left: 0px;

    & > div {
      margin: 15px 0;

      & > input {
        min-width: 560px;
      }
    }
    & > button {
      margin-left: 30%;
    }
  }
`;
const AlertPosition = styled.div`
  width: 100%;
  height: 100px;
  ${flexCenter}
  z-index: ${({ open }) => (open ? 100 : -10)};
  position: absolute;
  top: 8%;
`;
