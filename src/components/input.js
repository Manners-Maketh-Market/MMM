import { styled, css } from "styled-components";
import { flexCenter } from "../styles/common.style";

const MMMInput = ({ label, error, size, ...inputProps }) => {
  return (
    <>
      <label>{label}</label>
      <InputBox {...inputProps} size={size} />
      {error && <p>{error}</p>}
    </>
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

const InputBox = styled.input`
  width: 80%;
  height: 48px;
  ${flexCenter};
  position: relative;
  margin-bottom: 16px;
  ${({ size }) => sizeCSS[size]}

  & input {
    width: 100%;
    border: 1px solid #999;
    border-radius: 5px;
    height: 100%;
    text-align: center;
  }

  & label {
    position: absolute;
    left: 15px;
    top: -5px;
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    background-color: ${({ theme }) => theme.COLORS.white};
    z-index: 1;
    padding: 0 5px;
  }
`;
