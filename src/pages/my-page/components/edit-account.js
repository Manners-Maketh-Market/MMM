import MMMButton from "components/button";
import MMMInput from "components/input";
import { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import defaultProfile from "../../../images/defaultProfile.jpg";
import useInputs from "hooks/use-inputs";
import { FormValidate } from "utils/validate-helper";
import { useMutation, useQuery } from "react-query";
import { Api } from "apis";
import { useRecoilState } from "recoil";
import { isEmailCheckPass } from "store";
import { isNickNameCheckPass } from "store";
import { PRODUCT_QUERY_KEY } from "consts";

const EditAccountInfo = () => {
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

  // changeProfileUrl.
  const { mutateAsync: mutateChangeProfile } = useMutation((uploadedImage) =>
    Api.patchUserProfile(uploadedImage)
  );

  // duplicate check
  const [isEmailCheckPassState, setIsEmailCheckPassState] =
    useRecoilState(isEmailCheckPass);
  const [isNickNameCheckPassState, setIsNickNameCheckPassState] =
    useRecoilState(isNickNameCheckPass);

  // check email duplicate
  const onCheckEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.getCheckEmail(email);
      setIsEmailCheckPassState(true);
      alert(res.data.message);
    } catch {
      setIsEmailCheckPassState(false);
      alert("중복된 이메일입니다.");
    }
  };

  // check nickName duplicate
  const onCheckNickName = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.getCheckNickName(nickName);
      setIsNickNameCheckPassState(true);
      alert(res.data.message);
    } catch {
      setIsNickNameCheckPassState(false);
      alert("중복된 닉네임입니다.");
    }
  };

  // validate check
  const [{ email, nickName, phone, region, image }, onChangeInputs] = useInputs(
    {
      email: "",
      nickName: "",
      phone: "",
      region: "",
      image: "",
    }
  );
  const { disabled, errors, access } = FormValidate({
    email,
    nickName,
    image,
  });

  // getMyInfo.
  const { data: getMyInfo } = useQuery([PRODUCT_QUERY_KEY.USER_DATA], () =>
    Api.getUserData()
  );

  // changeInfo.
  const { mutateAsync: mutateChangeMyInfo } = useMutation((editedInfo) =>
    Api.patchUserData(editedInfo)
  );

  // change profile && info.
  const onChangeMyInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    // 변경할 정보
    const editedInfo = {
      email: e.target.email.value,
      nickName: e.target.nickName.value,
      phone: e.target.phone.value,
      region: e.target.region.value,
    };

    try {
      await mutateChangeMyInfo(editedInfo);
      if (e.target.image.files.length > 0) {
        await mutateChangeProfile(formData);
      }
      alert("변경사항이 적용되었습니다!");
    } catch (error) {
      error && alert("변경사항을 저장하지 못했습니다.");
    }
  };

  return (
    getMyInfo && (
      <Wrapper>
        <Title>개인정보 수정</Title>
        <Contents onSubmit={onChangeMyInfo}>
          <Profile>
            {uploadedImage ? (
              <Image src={uploadedImage} />
            ) : (
              <Image src={getMyInfo.profile_url} />
            )}
            <ButtonWrap>
              <label htmlFor="imgUpload">변경하기</label>
              <EditImage
                id="imgUpload"
                type="file"
                name="image"
                onChange={onChangeImage}
                accept="image/*"
              />
              <DeleteButton onClick={onDeleteImage} type="button">
                삭제하기
              </DeleteButton>
            </ButtonWrap>
          </Profile>
          <OneRow>
            <MMMInput
              name="nickName"
              label={"닉네임"}
              size={"smallEditInfo"}
              placeholder={getMyInfo.nick_name}
              onChange={onChangeInputs}
              error={errors.nickName}
              access={access.nickName}
              isAvailableNickName={isNickNameCheckPassState}
              defaultValue={getMyInfo.nick_name}
            />
            <MMMButton
              size={"smallConfirm"}
              type="button"
              onClick={onCheckNickName}
            >
              중복확인
            </MMMButton>
          </OneRow>
          <OneRow>
            <MMMInput
              name="email"
              label={"이메일 주소"}
              size={"smallEditInfo"}
              placeholder={getMyInfo.email}
              onChange={onChangeInputs}
              error={errors.email}
              access={access.email}
              isAvailableEmail={isEmailCheckPassState}
              defaultValue={getMyInfo.email}
            />
            <MMMButton
              size={"smallConfirm"}
              type="button"
              onClick={onCheckEmail}
            >
              중복확인
            </MMMButton>
          </OneRow>

          <MMMInput
            name="phone"
            label={"핸드폰 번호"}
            size={"editInfo"}
            placeholder={getMyInfo.phone}
            onChange={onChangeInputs}
            defaultValue={getMyInfo.phone}
          />
          <MMMInput
            name="region"
            label={"우리 동네"}
            size={"editInfo"}
            placeholder={getMyInfo.region}
            onChange={onChangeInputs}
            defaultValue={getMyInfo.region}
          />
          <MMMButton size={"small"} type="submit">
            변경사항 저장
          </MMMButton>
        </Contents>
      </Wrapper>
    )
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
  border: 1px solid navy;
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

const OneRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;

  & > button {
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
    margin-top: 20px;
  }
`;
