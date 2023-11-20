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
      <label htmlFor="phone">휴대폰 번호</label>
      <input
        name="phone"
        value={num}
        ref={phoneRef}
        onChange={handlePhone}
        placeholder="핸드폰 번호"
        type="tel"
        required
      />
    </S.Wrapper>
  );
};

export default Phone;

const Wrapper = styled.div`
  border: none;
  margin: 30px 0 40px;
  outline: none;
  color: ${({ theme }) => theme.COLORS.gray[400]};

  & > input {
    position: relative;
    min-width: 918px;
    min-height: 48px;
    border-radius: 6px;
    padding-left: 16px;
    margin: 4px 0 4px;
    ${flexCenter};
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};

    @media ${({ theme }) => theme.DEVICE.tablet2} {
      min-width: 320px;
      min-height: 42px;
      border-radius: 6px;
      font-size: 12px;
    }
    @media ${({ theme }) => theme.DEVICE.laptop} {
      min-width: 620px;
    }
  }

  & > label {
    position: absolute;
    margin-top: -2%;
    margin-left: 12px;
    color: ${({ theme }) => theme.COLORS["black"]};
    font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
    ${flexAlignCenter};
    align-items: flex-start;

    @media ${({ theme }) => theme.DEVICE.smallMobile} {
      margin-top: -8px;
      font-size: 12px;
    }
    @media ${({ theme }) => theme.DEVICE.tablet2} {
      margin-left: -76%;
      margin-top: -19%;
      font-size: 12px;
    }
    @media ${({ theme }) => theme.DEVICE.laptop} {
      margin-left: -86%;
      margin-top: -12%;
      font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
    }
  }

  @media ${({ theme }) => theme.DEVICE.smallMobile} {
  }
  @media ${({ theme }) => theme.DEVICE.tablet2} {
    ${flexCenter}
    flex-direction: column;

    & > div {
      & > p {
        font-size: 12px;
      }
    }
  }
  @media ${({ theme }) => theme.DEVICE.laptop} {
    ${flexCenter}
    flex-direction: column;
    & > div {
      & > p {
        font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
      }
    }
  }
`;

const S = {
  Wrapper,
};
