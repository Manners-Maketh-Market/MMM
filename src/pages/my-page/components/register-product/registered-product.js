import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import { styled } from "styled-components";
import { flexCenter } from "styles/common.style";
import Maps from "./maps";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RegisterDataIndex } from "store";
import { Api } from "apis";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { RegistData } from "store";
import { mswDataState } from "store";

const RegisterPage = () => {

  const [{ image, title, price, tag, explain, place }, onChangeInputs] =
    useInputs({
      image: "",
      title: "",
      price: "",
      tag: "",
      text: "",
    });

  const navigate = useNavigate();
  const onClickmypage = () => {
    navigate("/my-page");
  };


  const setRegister = useSetRecoilState(mswDataState);
  const setIsRegister = useSetRecoilState(RegistData);
  const readRegisterListIndex = useRecoilValue(RegisterDataIndex);
  
  const { mutate , data} = useMutation((newRegisterData) =>
    Api.postRegistData(newRegisterData)
  );

  data && console.log(data)

  const onSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      const newRegisterData = {
        image : e.target.image.value,
        title : e.target.title.value,
        price : e.target.price.value,
        tag : e.target.tag.value,
        text : e.target.text.value,
        location : e.target.location.value,
        RegisterIndex : readRegisterListIndex,
      };
      const RegistData = JSON.stringify(newRegisterData);
      mutate(RegistData);
      setRegister(RegistData);
      setIsRegister(true);
      console.log(RegistData);
      navigate("/my-page");
      alert("물품 등록이 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={onSubmitRegister}>
      <ImageBox>
        <label>물품 이미지</label>
        <div>
          <AddImage
            label="물품 이미지"
            name="image"
            type="file"
            accept="image/*"
            onChange={onChangeInputs}
            placeholder="이미지를 선택해주세요."
            size={"search"}
          />
          <TextBox>
            <p>클릭 또는 이미지를 드래그하여 등록할 수 있습니다.</p>
            <p>드래그하여 상품 이미지 순서를 변경할 수 있습니다.</p>
          </TextBox>
        </div>
      </ImageBox>
      <MMMInput
        label="제목"
        name="title"
        onChange={onChangeInputs}
        placeholder="제목을 입력해주세요"
        size={"registerProduct"}
      />
      <MMMInput
        label="가격"
        name="price"
        type="number"
        onChange={onChangeInputs}
        placeholder="0원"
        size={"registerProduct"}
      />
      <RequestsTitle>태그</RequestsTitle>
              <RequestSelect name = "tag">
                <option value="카테고리를 선택해주세요">
                카테고리를 선택해주세요.
                </option>
                <option value="전자기기">
                전자기기
                </option>
                <option value="의류">
                의류
                </option>
                <option value="식품">
                식품
                </option>
              </RequestSelect>
      <Box>
        <label>내용</label>
        <textarea placeholder="상품 설명을 입력해주세요" name = "text"/>
      </Box>
      <Maps />
      {/* <SearchLocation>
        <MMMButton shape={"shape"} size={"small"} variant={"secondary"}>
          검색
        </MMMButton>
      </SearchLocation> */}
      <MMMButton shape={"shape"} size={"full"} variant={"secondary"}>
        물품 등록
      </MMMButton>
    </Form>
  );
};

export default RegisterPage;

const Form = styled.form`
  // 1280+
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  ${flexAlignCenter}
  justify-content: space-evenly;
  flex-direction: column;
  padding-top: 80px;
  overflow-x: hidden;

  & > div {
    & > input {
      min-width: 954px;
      min-height: 48px;
    }
  }
  & > button {
    min-width: 954px;
    min-height: 46px;
    margin: 80px 0;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;
    padding-top: 100px;

    & > div {
      & > input {
        min-width: 200px;
        min-height: 38px;
        border-radius: 4px;
        font-size: 10px;
      }
      & > label,
      & > p {
        font-size: 10px;
      }
    }
    & > button {
      min-width: 200px;
      min-height: 38px;
      border-radius: 4px;
      font-size: 10px;
      margin: 40px 0 60px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    ${flexCenter}
    max-width: 400px;
    padding-top: 160px;

    & > div {
      & > input {
        min-width: 320px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
      }
      & > label,
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      min-width: 320px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    ${flexCenter}
    max-width: 700px;

    & > div {
      & > input {
        min-width: 620px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > label,
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
    & > button {
      min-width: 620px;
      min-height: 46px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;

const Box = styled.div`
  max-width: 954px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > label {
    margin-left: 12px;
    margin-bottom: 4px;
  }

  & > textarea {
    min-width: 954px;
    min-height: 264px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    border-radius: 7px;
    resize: none;
    padding: 20px 0 0 16px;
    margin-bottom: 20px;
  }

  // mediaQuery - textarea
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;

    & > textarea {
      min-width: 200px;
      min-height: 220px;
      padding: 20px;
      font-size: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;

    & > textarea {
      min-width: 320px;
      padding: 20px;
      font-size: 12px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700px;

    & > textarea {
      min-width: 620px;
      padding: 30px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;

const ImageBox = styled.div`
  max-width: 954px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  & > label {
    min-width: 930px;
    margin-bottom: 20px;
  }

  & > div {
    text-align: center;
    justify-content: center;
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    min-width: 400px;

    & > label {
      padding-left: 41%;
      margin-bottom: 10px;
    }
    & > div {
      margin-left: 0%;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    min-width: 400px;

    & > label {
      padding-left: 34%;
    }
    & > div {
      margin-left: 0%;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    min-width: 620px;
    & > label {
      padding-left: 18%;
    }
    & > div {
      margin-left: 0%;
    }
  }
`;
const AddImage = styled.input`
  max-width: 200px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  border-radius: 10px;

  &::file-selector-button {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.COLORS["white"]};
    border: none;
    background: no-repeat center;
    background-image: url("../../../assets/icon/camera.png");
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 140px;
    height: 140px;
    font-size: 10px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 160px;
    height: 160px;
    font-size: 12px;
  }
`;

const TextBox = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  margin-top: 20px;
  text-align: center;

  & > p {
    padding: 2px 0;
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    font-size: 8px;
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    font-size: 10px;
  }
`;

const RequestsTitle = styled.div`
border: none;
margin: 0px;
outline: none;
color: ${({ theme }) => theme.COLORS.gray[400]};
padding-bottom: 30px;

& > label {
  padding-left: 12px;
  color: ${({ theme }) => theme.COLORS["black"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
}
`;

const RequestSelect = styled.select`
width: 954px;
height: 48px;
border-radius: 6px;
border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
`;