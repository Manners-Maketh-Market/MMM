import MMMButton from "components/button";
import MMMInput from "components/input";
import { useState } from "react";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";
import defaultProfile from "../../../images/defaultProfile.jpg";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";

const EditAccountInfo = ({ user }) => {
  // change profile image
  const [uploadedImage, setUploadedImage] = useState("");
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };
  const onDeleteImage = (e) => {
    setUploadedImage(defaultProfile);
  };

  // change email, nickname, phoneNumber, location
  // validate check
  const [{ email, nickName }, onChangeInputs] = useInputs({
    email: "",
    nickName: "",
  });
  const { disabled, errors, access } = formValidate({
    email,
    nickName,
  });
  // 기존 정보와 동일한가?

  // post edited Userinfo.

  return (
    <Wrapper>
      <Title>개인정보 수정</Title>
      <Contents>
        <Profile>
          {uploadedImage ? (
            <Image src={uploadedImage} />
          ) : (
            <Image src={user[0].profileImg} />
          )}
          <ButtonWrap>
            <label htmlFor="imgUpload">변경하기</label>
            <EditImage
              id="imgUpload"
              type="file"
              name="file"
              onChange={onChangeImage}
              /* accept="image/jpg,impge/png,image/jpeg" */
              accept="image/*"
            />
            <DeleteButton onClick={onDeleteImage} type="button">
              삭제하기
            </DeleteButton>
          </ButtonWrap>
        </Profile>
        <MMMInput
          name="nickName"
          label={"닉네임"}
          size={"editInfo"}
          placeholder={user[0].nickName}
          onChange={onChangeInputs}
          error={errors.nickName}
          access={access.nickName}
        />
        <MMMInput
          name="email"
          label={"이메일 주소"}
          size={"editInfo"}
          placeholder={user[0].email}
          onChange={onChangeInputs}
          error={errors.email}
          access={access.email}
        />
        <MMMInput
          name="phoneNumber"
          label={"핸드폰 번호"}
          size={"editInfo"}
          placeholder={user[0].phoneNumber}
          onChange={onChangeInputs}
        />
        <MMMInput
          name="location"
          label={"우리 동네"}
          size={"editInfo"}
          placeholder={user[0].location}
          onChange={onChangeInputs}
        />
        <MMMButton size={"small"} type="submit" disabled={disabled}>
          변경사항 저장
        </MMMButton>
      </Contents>
    </Wrapper>
  );
};

export default EditAccountInfo;

const Wrapper = styled.div`
  // default: 1280px
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-left: 60px;
  padding: 80px 0;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    font-size: 12px;
    margin-left: 10px;
    padding: 60px 0 40px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    margin-left: 30px;
    padding: 50px 0;
  }
`;

const Contents = styled.form`
  ${flexCenter}
  flex-direction: column;
  overflow: hidden;

  & > button {
    margin: 60px 0 100px;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    & > div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(4),
    div:nth-of-type(5) {
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
      margin: 30px 0 60px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    align-items: flex-start;

    & > div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(4),
    div:nth-of-type(5) {
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
      margin: 20px 0 100px 25%;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    align-items: flex-start;

    & > div:nth-of-type(2),
    div:nth-of-type(3),
    div:nth-of-type(4),
    div:nth-of-type(5) {
      & > input {
        min-width: 560px;
      }
      & > button {
        margin-left: 32%;
      }
    }
  }
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 80px 20%;

  & > input {
    min-width: 540px;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    flex-direction: column;
    margin: 0 0 60px 0;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    flex-direction: column;
    margin: 0 0 60px 14%;
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    flex-direction: column;
  }
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
  border: none;
  border-radius: 50%;

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    width: 100px;
    height: 100px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    width: 100px;
    height: 100px;
    margin-left: 26px;
  }
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;

  & > button,
  & > label {
    width: 160px;
    height: 46px;
    transition: all 0.5s;
    background: ${({ theme }) => theme.COLORS["white"]};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.COLORS.primary["blue"]};
    font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};

    &:hover {
      color: ${({ theme }) => theme.COLORS["white"]};
      background-color: ${({ theme }) => theme.COLORS.primary["blue"]};
    }
  }
  & > label {
    ${flexCenter}
    margin-right: 12px;
  }
  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    padding-top: 20px;
    margin-left: 0px;

    & > button,
    & > label {
      width: 80px;
      height: 40px;
      font-size: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    padding-top: 20px;
    & > button,
    & > label {
      width: 110px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    padding-top: 20px;
  }
`;
const EditImage = styled.input`
  display: none;
`;
const DeleteButton = styled.button``;
