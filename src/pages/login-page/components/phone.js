import React, { useState, useRef } from "react";
import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "styles/common.style";

const Phone = () => {
  const [num, setNum] = useState("");
  const phoneRef = useRef();

  // 휴대폰 번호 입력 함수
  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    phoneRef.current.value = result;

    setNum(e.target.value);
  };

  return (
    <S.Wrapper>
      <label htmlFor="user-num">휴대폰 번호</label>
      <input
        name="user-num"
        value={num}
        ref={phoneRef}
        onChange={handlePhone}
        placeholder="핸드폰 번호"
        type="tel"
      />
    </S.Wrapper>
  );
};

export default Phone;

const Wrapper = styled.div`
  border: none;
  margin: 0px;
  outline: none;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  padding-bottom: 30px;

  & > input {
    width: 918px;
    height: 48px;
    border-radius: 6px;
    padding-left: 16px;
    margin: 4px 0 4px;
    ${flexCenter};
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  }

  & > label {
    padding-left: 12px;
    color: ${({ theme }) => theme.COLORS["black"]};
    font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
    ${flexAlignCenter};
    align-items: flex-start;
  }

  // mediaQuery
  @media ${({ theme }) => theme.DEVICE.smallMobile} {
    & > div {
      & > input {
        min-width: 320px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
      }
      & > label {
        font-size: 12px;
      }
      & > p {
        font-size: 12px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    & > div {
      & > input {
        min-width: 320px;
        min-height: 42px;
        border-radius: 6px;
        font-size: 12px;
      }
      & > label {
        font-size: 12px;
      }
      & > p {
        font-size: 12px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    & > div {
      & > input {
        min-width: 620px;
        min-height: 48px;
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > label {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
  }
`;

const S = {
  Wrapper,
};
