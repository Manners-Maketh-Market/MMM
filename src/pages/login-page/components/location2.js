import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import MMMInput from "components/input";
import MMMButton from "components/button";

const ProductOrder = () => {
  const { state } = useLocation();
  const [modalState, setModalState] = useState(false);
  const [inputAddressValue, setInputAddressValue] = useState();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  // 모달 밖 클릭 시 창 닫힘
  const modalRef = useRef();
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

  const handleAddressValue = (e) => {
    setInputAddressValue(e.target.value);
  };

  return (
    <RegionWrapper>
      <OneRow>
        <MMMInput
          label="지역선택"
          name="region"
          type={"text"}
          onChange={handleAddressValue}
          value={inputAddressValue}
          placeholder="주소를 입력해주세요"
          size={"large"}
          required
        />
        <MMMButton onClick={handleModal} type="button" size={"confirm"}>
          주소찾기
        </MMMButton>
      </OneRow>
      {/* 도로명 주소 modal */}
      <Modal ref={modalRef} modalState={modalState}>
        <DaumPostcode
          style={postCodeStyle}
          onComplete={onCompletePost}
          name="region"
        />
      </Modal>
    </RegionWrapper>
  );
};

export default ProductOrder;

const RegionWrapper = styled.div``;
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
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    max-width: 240px;

    & > div {
      & > input {
        min-width: 150px;
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
      min-width: 38px;
      min-height: 38px;
      font-size: 10px;
      margin-left: 6px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    max-width: 400px;

    & > div {
      & > input {
        min-width: 240px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
        margin-left: 10px;
      }
      & > label,
      & > p {
        font-size: 12px;
      }
    }
    & > button {
      min-width: 70px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    max-width: 700px;

    & > div {
      & > input {
        min-width: 466px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
        margin-left: 10px;
      }
      & > label,
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
    & > button {
      min-width: 140px;
      margin-left: 10px;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }
`;

const Modal = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ modalState }) => (modalState ? "block" : "none")};
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.3);

  & > div {
    border-radius: 20px;
  }
`;
