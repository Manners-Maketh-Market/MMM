import { Api } from "apis";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { flexAlignCenter } from "styles/common.style";
import { FormValidate } from "utils/validate-helper";

const ChangePassword = () => {
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
    useMutation((newPassword) => Api.patchUserPassword(newPassword));

  // patch password
  const onEditPassword = async (e) => {
    e.preventDefault();
    const newPasswordConfirm = e.target.pwConfirm.value;
    const newPassword = e.target.pw.value;
    const patchPassword = {
      pw: newPassword,
    };

    if (newPassword === newPasswordConfirm && newPassword.length >= 4) {
      try {
        await mutateChangePassword(patchPassword);
        alert("비밀번호 변경에 성공하셨습니다!");
      } catch (error) {
        error && alert("비밀번호 변경에 실패했습니다");
      }
    } else if (newPassword !== newPasswordConfirm) {
      alert("비밀번호가 일치하는지 확인해주세요!");
    } else if (newPassword.length < 4) {
      alert("비밀번호를 네자리 이상 입력해주세요!");
    }
  };

  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <Contents onSubmit={onEditPassword}>
        {/* <MMMInput label={"비밀번호"} type="password" name="pw" size={"editInfo"} placeholder="password" onChange={onChangeInputs}/> */}
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

  // mediaQuery
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

  // mediaQuery
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

  // mediaQuery
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
      & > input {
        min-width: 560px;
      }
    }
    & > button {
      margin-left: 30%;
    }
  }
`;
