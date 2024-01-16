import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import AuthApi from "apis/auth";
import { PRODUCT_QUERY_KEY } from "consts";
import { useState } from "react";
import useInputs from "hooks/use-inputs";
import MMMButton from "components/button";
import MMMInput from "components/input";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import defaultProfile from "../../../images/defaultProfile.jpg";
import MMMAlert from "components/mmm-alert";
import {
  isEmailCheckPass,
  isNickNameCheckPass,
} from "store/registration-state";

const EditAccountInfo = () => {
  // alert
  const [open, setOpen] = useState(false);
  const [cases, setCases] = useState(0);

  // change profile image
  const [uploadedImage, setUploadedImage] = useState(defaultProfile);

  const onChangeImage = (e) => {
    console.log("54654", e.target.files);
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };
  const onDeleteImage = (e) => {
    console.log("54654", e.target.files);

    // formData.append("image", defaultProfile);
    setUploadedImage(defaultProfile);
  };

  // changeProfileUrl.
  const { mutateAsync: mutateChangeProfile } = useMutation((uploadedImage) =>
    AuthApi.patchUserProfile(uploadedImage)
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
      const res = await AuthApi.getCheckEmail(email);
      setIsEmailCheckPassState(true);
      setCases(3);
      setOpen(true);
    } catch {
      setIsEmailCheckPassState(false);
      setCases(4);
      setOpen(true);
    }
  };

  // check nickName duplicate
  const onCheckNickName = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthApi.getCheckNickName(nickName);
      setIsNickNameCheckPassState(true);
      setCases(3);
      setOpen(true);
    } catch {
      setIsNickNameCheckPassState(false);
      setCases(4);
      setOpen(true);
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

  // getMyInfo.
  const { data: getMyInfo } = useQuery([PRODUCT_QUERY_KEY.USER_DATA], () =>
    AuthApi.getUserData()
  );

  // changeInfo.
  const { mutateAsync: mutateChangeMyInfo } = useMutation((editedInfo) =>
    AuthApi.patchUserData(editedInfo)
  );

  // change profile && info.
  const onChangeMyInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    console.log("wdw", e.target.image.files);

    // const defaultData = new FormData();

    // if (uploadedImage) {
    //   console.log("실행됨");
    //   formData.append("image", defaultProfile);
    // } else {
    //   console.log("4654654654");
    //   formData.append("image", e.target.image.files[0]);
    // }

    formData.append("image", e.target.image.files[0]);
    // defaultData.append("image", defaultData);

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
      setCases(1);
      setOpen(true);
      setTimeout(() => window.location.replace("/MMM/my-page"), 1000);
    } catch (error) {
      setCases(2);
      setOpen(true);
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
          <AlertPosition open={open}>
            <MMMAlert
              size={"md"}
              color={
                cases === 1
                  ? "success"
                  : cases === 2
                  ? "error"
                  : cases === 3
                  ? "success"
                  : "warning"
              }
              severity={
                cases === 1
                  ? "success"
                  : cases === 2
                  ? "error"
                  : cases === 3
                  ? "success"
                  : "warning"
              }
              MessageTitle={
                cases === 1
                  ? "Storage Success"
                  : cases === 2
                  ? "Storage Fail"
                  : cases === 3
                  ? "Duplicate Check"
                  : "Duplicated"
              }
              AlertMessage={
                cases === 1
                  ? "변경사항이 저장되었습니다!"
                  : cases === 2
                  ? "변경사항이 저장되지 못했습니다!"
                  : cases === 3
                  ? "사용 가능합니다."
                  : "중복되었습니다."
              }
              open={open}
              setOpen={setOpen}
            />
          </AlertPosition>
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
  position: relative;
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
  max-width: 1200px;
  ${flexCenter}
  flex-direction: column;
  overflow: hidden;

  & > div:nth-of-type(4),
  div:nth-of-type(5) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    & > label {
      position: absolute;
      left: 0%;
      top: -16%;
    }
  }

  & > button {
    margin: 60px 0 100px;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    & > div:nth-of-type(2),
    div:nth-of-type(3) {
      & > div {
        & > input {
          min-width: 120px;
        }
        & > label {
          font-size: 10px;
        }
        & > p {
          font-size: 8px;
        }
      }
      & > button {
        min-width: 40px;
        font-size: 10px;
      }
    }
    & > div:nth-of-type(4),
    div:nth-of-type(5) {
      & > input {
        min-width: 220px;
      }
      & > label {
        font-size: 10px;
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
    div:nth-of-type(3) {
      & > div {
        & > input {
          min-width: 320px;
        }
        & > label {
          font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
        }
      }
      & > button {
        min-width: 60px;
        font-size: 12px;
      }
    }
    & > div:nth-of-type(4),
    div:nth-of-type(5) {
      & > input {
        width: 400px;
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
    max-width: 800px;

    & > div:nth-of-type(2),
    div:nth-of-type(3) {
      & > div {
        margin: 15px 0;

        & > input {
          min-width: 420px;
        }
      }
    }
    & > div:nth-of-type(4),
    div:nth-of-type(5) {
      margin: 15px 0;

      & > input {
        min-width: 560px;
      }
    }
    & > button {
      width: 120px;
      margin: 30px 0 60px;
      font-size: 12px;
    }
  }
`;
const Profile = styled.div`
  ${flexCenter}
  flex-direction: row;
  margin-bottom: 120px;

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
    margin-left: -3%;
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

const AlertPosition = styled.div`
  width: 100%;
  height: 100px;
  ${flexCenter}
  z-index: ${({ open }) => (open ? 100 : -10)};
  position: absolute;
  top: 32%;
`;
