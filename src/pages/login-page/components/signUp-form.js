import { formValidate } from "utils/validate-helper";
import MMMButton from "components/button";
import MMMInput from "components/input";
import useInputs from "hooks/use-inputs";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Phone from "pages/login-page/components/phone";
import duplicationCheckAPI from "./duplicationcheck";

const SignUpForm = ({ setIsFormLogin }) => {

  const [usableId, setUsableId] = useState(false);

  const onSubmitSignUp = (e) => {
    e.preventDefault();
    alert("회원가입이 되었습니다. 축하합니다");
    setIsFormLogin(true);
  };

  const [
    { email, password, passwordConfirm, nickName, phoneNumber, location, usabledId },
    onChangeInputs,
  ] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
    nickName: "",
    phoneNumber: "",
    location: "",
    usabledId: false,
  });

  const { disabled, errors } = formValidate({
    email,
    password,
    passwordConfirm,
    nickName,
  });

  // const duplicationCheck = () => {
  //   duplicationCheckAPI(email, nickName)
  //   .then((response) => {
  //     console.log(response)
  //     if(response === false){
  //       alert('사용 가능한 아이디입니다.');
  //       setUsableId(response);
  //     }
  //     else{
  //       alert('중복된 아이디입니다. 다시 시도하세요.');
  //       setUsableId(response);
  //       setUserid('');
  //     }
  //     console.log('중복체크');
  //   })
  // }
  // 아이디 중복확인 체크 페이지
  // https://velog.io/@ch9eri/%EA%B0%99%EA%B3%B5-%ED%95%B4%EA%B2%B0-%EC%95%84%EC%9D%B4%EB%94%94-%EC%A4%91%EB%B3%B5-%ED%99%95%EC%9D%B8-API

  return (
    <Form onSubmit={onSubmitSignUp}>
      <OneRow>
        <MMMInput
          label="이메일"
          name="email"
          type="text"
          onChange={onChangeInputs}
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          size={"large"}
        />
        <DuButton >중복확인</DuButton>
      </OneRow>
      <OneRow>
        <MMMInput
          label="비밀번호"
          name="password"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          size={"full"}
        />
      </OneRow>
      <OneRow>
        <MMMInput
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          onChange={onChangeInputs}
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          size={"full"}
        />
      </OneRow>
      <OneRow>
        <MMMInput
          label="닉네임"
          name="nickName"
          onChange={onChangeInputs}
          placeholder="닉네임을 입력해주세요."
          error={errors.nickName}
          size={"large"}
        />
        <DuButton  >중복확인</DuButton>
      </OneRow>
      <OneRow>
        <Phone/>
      </OneRow>
      <OneRow>
        <MMMInput
          label="지역선택"
          name="location"
          onChange={onChangeInputs}
          placeholder="검색 버튼을 눌러주세요."
          size={"large"}
        />
        <DuButton >중복확인</DuButton>
      </OneRow>
      <MMMButton variant={"primary"} size={"full"}>회원가입</MMMButton>
    </Form>
  );
};
export default SignUpForm;



const Form = styled.form`
  height: 740px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const OneRow = styled.div`
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


const DuButton = styled.div`
  border: 1px solid #282190;
  background-color: #fff;
  color: #282190;
  font-weight: 600;
  margin-bottom: 20px;
  width: 313px;
  height: 48px;
  border-radius: 4px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


// 밑에 회원가입 버튼으로 회원가입이 되게 만들기
// 1. 중복검사 - 일단 적용할만한거 도전 중
// 2. 회원가입 페이지때 네비게이션 버튼 없애기
// 3. 지역선택