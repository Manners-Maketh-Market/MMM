import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import { styled } from "styled-components";
import { flexCenter } from "styles/common.style";

const RegisterPage = ({ setIsFormRegister }) => {
  const onSubmitRegister = (e) => {
    e.preventDefault();
    alert("물품이 등록되었습니다.");
    setIsFormRegister(true);
  };

  const [{ image, title, price, tag, explain, place }, onChangeInputs] =
    useInputs({
      image: "",
      title: "",
      price: "",
      tag: "",
      explain: "",
      place: "",
    });

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
      <MMMInput
        label="태그"
        name="tag"
        onChange={onChangeInputs}
        placeholder="카테고리를 입력해주세요."
        size={"registerProduct"}
      />
      <Box>
        <label>내용</label>
        <textarea placeholder="상품 설명을 입력해주세요" />
      </Box>
      <SearchLocation>
        <MMMInput
          label="지역선택"
          name="location"
          onChange={onChangeInputs}
          placeholder="검색 버튼을 눌러주세요."
          size={"larger"}
        />
        <MMMButton shape={"shape"} size={"small"} variant={"secondary"}>
          검색
        </MMMButton>
      </SearchLocation>
      <MMMButton shape={"shape"} size={"full"} variant={"secondary"}>
        물품 등록
      </MMMButton>
    </Form>
  );
};

export default RegisterPage;

const Form = styled.form`
  margin: 120px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  input {
    margin: 20px 0 40px;
  }

  & > button {
    width: 954px;
    margin: 80px 0;
  }
`;

const Box = styled.div`
  width: 954px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & > label {
    justify-content: flex-start; // 적용 안 됨
    margin-bottom: 20px;
  }

  & > textarea {
    width: 954px;
    min-height: 264px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    border-radius: 7px;
    resize: none;
    padding: 20px 0 0 16px;
    margin-bottom: 20px;
  }
`;

// 물품 등록
const ImageBox = styled.div`
  width: 954px;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;

  & > label {
    justify-content: flex-start;
    padding-left: 16px;
    margin-bottom: 20px;
  }

  & > div {
    margin-left: 30%;
    text-align: center;
  }
`;
const AddImage = styled.input`
  width: 200px;
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
`;

const TextBox = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  margin-top: -20px;

  & > p {
    padding: 2px 0;
  }
`;

// 지역 검색
const SearchLocation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > button {
    margin-bottom: 35px;
  }
`;
