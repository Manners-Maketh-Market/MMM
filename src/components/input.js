import { styled, css } from "styled-components";
import { flexCenter } from "../styles/common.style";

const MMMInput = ({ label, error, size, ...inputProps }) => {
  return (
    <InputBox>
      <label>{label}</label>
      <Input {...inputProps} size={size} />
      <ErrorMessage>{error && <p>{error}</p>}</ErrorMessage>
    </InputBox>
  );
};
export default MMMInput;

const sizeCSS = {
  search: css`
    width: 28px;
    height: 40px;
    border-radius: 50%;
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

const InputBox = styled.div`
  position: relative;
  margin-bottom: 40px;

  & > label {
    position: relative;
    top: -4px;
    font-size: 16px;
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
