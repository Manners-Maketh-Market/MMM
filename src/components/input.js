import { styled, css } from "styled-components";
import { flexCenter } from "../styles/common.style";

const MMMInput = ({ label, error, size, ...inputProps }) => {
  return (
    <>
      <label>{label}</label>
      <InputBox {...inputProps} size={size} />
      <ErrorMessage>{error && <p>{error}</p>}</ErrorMessage>
    </>
  );
};
export default MMMInput;

const sizeCSS = {
  search: css`
    width: 280px;
    height: 40px;
    border-radius: 62px;
    background-color: ${({ theme }) => theme.COLORS.gray[100]};
  `,
  searchPrice: css`
    width: 764px;
    height: 56px;
    border-radius: 50%;
  `,
  // signIn & signUp : large, full
  large: css`
    width: 585px;
    height: 48px;
    border-radius: 6px;
  `,
  full: css`
    width: 918px;
    height: 48px;
    border-radius: 6px;
  `,
  registerProduct: css`
    width: 954px;
    height: 48px;
    border-radius: 6px;
  `,
};

const InputBox = styled.input`
  ${({ size }) => sizeCSS[size]}
  ${flexCenter};
  position: relative;
  margin-bottom: 16px;
  border: none;
  margin: 0px;
  outline: none;
  padding: 0 50px 0 20px;
  color: #757575;
  & input {
    width: 100%;
    border-radius: 5px;
    height: 100%;
    text-align: center;
  }
`;

const Input = styled.input`
  position: relative;
  padding-left: 16px;
  ${flexCenter};
  ${({ size }) => sizeCSS[size]}
  border: 1px solid #757575;
`;

const ErrorMessage = styled.p`
  position: absolute;
  top: 64%;
  left: 16px;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  color: #ec0707;
`;
