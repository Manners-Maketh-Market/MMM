import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import { flexCenter } from "styles/common.style";
import { styled, css } from "styled-components";
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
      <Box>
        <label>물품 이미지</label>
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
      </Box>
      <Box>
        <MMMInput
          label="제목"
          name="title"
          onChange={onChangeInputs}
          placeholder="제목을 입력해주세요"
          size={"registerProduct"}
        />
      </Box>
      <Box>
        <MMMInput
          label="가격"
          name="price"
          type="number"
          onChange={onChangeInputs}
          placeholder="0원"
          size={"registerProduct"}
        />
      </Box>
      <Box>
        <MMMInput
          label="태그"
          name="tag"
          onChange={onChangeInputs}
          placeholder="카테고리를 입력해주세요."
          size={"registerProduct"}
        />
      </Box>
      <Box>
        <label>내용</label>
        <textarea placeholder="상품 설명을 입력해주세요" />
      </Box>
      <Box>
        <MMMInput
          label="지역선택"
          name="location"
          onChange={onChangeInputs}
          placeholder="검색 버튼을 눌러주세요."
          size={"registerProduct"}
        />
      </Box>
      <Box>
        <MMMButton shape={"shape"} size={"full"} variant={"primary"}>
          물품 등록
        </MMMButton>
      </Box>
    </Form>
  );
};

export default RegisterPage;

const Form = styled.form`
  height: 1000px;
  weight: 1000px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > button {
    border: 1px solid #282190;
    background-color: #fff;
    color: #282190;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const AddImage = styled.input`
  width: 200px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  border-radius: 10px;
`;

const TextBox = styled.div``;
