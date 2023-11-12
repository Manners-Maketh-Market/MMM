import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';


const Location = () => {
  const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState();
  const [inputZipCodeValue, setInputZipCodeValue] = useState();


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
            <UserAddressAndPayment>
              <ShipMentTitle>주소검색</ShipMentTitle>
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
                <DaumPostcode
                  style={postCodeStyle}
                  onComplete={onCompletePost}
                ></DaumPostcode>
              </PostCodeWrapper>
            </UserAddressAndPayment>
    </Container>
  );
};

export default Location;

const Container = styled.div`
  width: 1024px;
  margin: auto;
  padding: 50px 75px;
  border: 1px solid 
  margin-top: 50px;
  margin-bottom: 100px;
  border-radius: 20px;
  text-align: center;
  position: relative;
`;

const ModalBlock = styled.div`
  width: 100%;
  background-color: ;
  opacity: 0.5;
  position: absolute;
  display: ${({ modalState }) => (modalState ? 'block' : 'none')};
  top: 0;
  left: 0;
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

const ShipMentTitle = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  text-align: start;
  font-size: 20px;
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
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  display: ${({ modalState }) => (modalState ? 'block' : 'none')};
`;

