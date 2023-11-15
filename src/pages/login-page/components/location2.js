import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const ProductOrder = () => {
  const { state } = useLocation();
  const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState();
  const [inputZipCodeValue, setInputZipCodeValue] = useState();



  const navigate = useNavigate();

  const modalRef = useRef(); //화면 외부 클릭하면 창이 닫히게
  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);

    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  });

  const clickModalOutside = event => {
    if (modalState && !modalRef.current.contains(event.target)) {
      setModalState(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const onCompletePost = data => {
    setModalState(false);
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  };

  const postCodeStyle = {
    width: '400px',
    height: '400px',
    display: modalState ? 'block' : 'none',
  };

  const handleModal = () => {
    setModalState(true);
  };

  const handleXbutton = () => {
    setModalState(false);
  };

  const handleZipCode = e => {
    setModalState(false);
    // set;
  };

  const handleAddress = e => {
    setInputAddressValue(e.target.value);
  };
  return (
    <Container>
      <ModalBlock modalState={modalState}></ModalBlock>
      <ProductContainer>
        <UserForm onSubmit={handleSubmit}>
          <UserFormContainer>
            <UserAddressAndPayment>             
              <ZipCodeWrapper>
                <ZipCodeInput
                  onChange={handleZipCode}
                  value={inputZipCodeValue}
                  placeholder="우편번호"
                  type={'text'}
                ></ZipCodeInput>
                <ZipCodeFindButton onClick={handleModal}>
                  주소찾기
                </ZipCodeFindButton>
              </ZipCodeWrapper>
              <AddressInput
                onChange={handleAddress}
                value={inputAddressValue}
                placeholder="주소"
                type={'text'}
              ></AddressInput>
              <DetailAddressInput
                placeholder="상세주소"
                type={'text'}
              ></DetailAddressInput>
       
              <PostCodeWrapper ref={modalRef} modalState={modalState}>
                <PostCodeHeader>
                  <div onClick={handleXbutton}></div>
                </PostCodeHeader>
                <DaumPostcode
                  style={postCodeStyle}
                  onComplete={onCompletePost}
                ></DaumPostcode>
              </PostCodeWrapper>
            </UserAddressAndPayment>
          </UserFormContainer>
        </UserForm>
      </ProductContainer>
    </Container>
  );
};

export default ProductOrder;

const Container = styled.div`
  
  margin: auto;
  padding: 50px 75px;
  border: 1px solid ;
  margin-top: 50px;
  margin-bottom: 100px;
  border-radius: 20px;
  text-align: center;
  position: relative;
`;

const ModalBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: ;
  opacity: 0.5;
  position: absolute;
  display: ${({ modalState }) => (modalState ? 'block' : 'none')};
  top: 0;
  left: 0;
`;

const ProductContainer = styled.div``;



const UserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserFormContainer = styled.div`
  display: flex;
`;

const UserAddressAndPayment = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  width: 60%;
  input {
    padding: 7px 12px;
    border: 1px solid ;
  }
  input::placeholder {
    color: ;
  }
`;



const ZipCodeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ZipCodeInput = styled.input`
  width: 30%;
  margin-right: 10px;
`;

const ZipCodeFindButton = styled.div`
  cursor: pointer;
  background-color: ;
  color: ;
  padding: 6px 21px;
`;

const AddressInput = styled.input`
  margin-bottom: 12px;
`;

const DetailAddressInput = styled.input`
  margin-bottom: 12px;
`;


const PostCodeWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  width: 400px;
  height: 450px;
  z-index: 100;
  background-color: ;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  display: ${({ modalState }) => (modalState ? 'block' : 'none')};
`;

const PostCodeHeader = styled.div`
  position: relative;
  height: 50px;
  border-bottom: 1px solid ;
`;


// 주소 검색 API 현재 value값을 못넘기고 있어서 일단은 기존에 데이터가 넘어가던 것을 그대로 적용시켜뒀음
