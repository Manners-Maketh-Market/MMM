import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const ProductOrder = () => {
  const { state } = useLocation();
  const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState();
  const [inputZipCodeValue, setInputZipCodeValue] = useState();

  const modalRef = useRef(); //화면 외부 클릭하면 창이 닫히게
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (modalState && !modalRef.current.contains(event.target)) {
      setModalState(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onCompletePost = (data) => {
    setModalState(false);
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  };

  const postCodeStyle = {
    width: "400px",
    height: "400px",
    display: modalState ? "block" : "none",
  };

  const handleModal = () => {
    setModalState(true);
  };
  const onCloseModal = () => {
    setModalState(false);
  };

  const handleZipCodeValue = (e) => {
    setModalState(false);
  };
  const handleAddressValue = (e) => {
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
                  onChange={handleZipCodeValue}
                  value={inputZipCodeValue}
                  placeholder="우편번호"
                  type={"text"}
                />
                <ZipCodeFindButton onClick={handleModal}>
                  주소찾기
                </ZipCodeFindButton>
              </ZipCodeWrapper>
              <AddressInput
                onChange={handleAddressValue}
                value={inputAddressValue}
                placeholder="주소"
                type={"text"}
              />
              <DetailAddressInput placeholder="상세주소" type={"text"} />
              <PostCodeWrapper ref={modalRef} modalState={modalState}>
                <PostCodeHeader>
                  <div onClick={onCloseModal}>x</div>
                </PostCodeHeader>
                <DaumPostcode
                  style={postCodeStyle}
                  onComplete={onCompletePost}
                />
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
  border: 1px solid;
  margin-top: 50px;
  margin-bottom: 100px;
  border-radius: 20px;
  text-align: center;
  position: relative;
`;
const ModalBlock = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  display: ${({ modalState }) => (modalState ? "block" : "none")};
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
    border: 1px solid;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  display: ${({ modalState }) => (modalState ? "block" : "none")};
`;
const PostCodeHeader = styled.div`
  position: relative;
  height: 50px;
  border-bottom: 1px solid;
`;
