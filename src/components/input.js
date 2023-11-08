import { styled, css } from "styled-components";
import { flexCenter } from "../styles/common.style";

const MMMInput = ({ label, error, access, size, ...inputProps }) => {
  return (
    <InputBox>
      <label>{label}</label>
      <Input {...inputProps} size={size} />
      <Message>{error && <p>{error}</p>}</Message>
      <Message>{access && <p>{access}</p>}</Message>
    </InputBox>
  );
};
export default MMMInput;

const sizeCSS = {
  search: css`
    width: 280px;
    height: 40px;
    border-radius: 62px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
    background-color: ${({ theme }) => theme.COLORS.gray[100]};
  `,
  large: css`
    min-width: 585px;
    min-height: 48px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  `,
  larger: css`
    min-width: 740px;
    min-height: 48px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  `,
  searchPrice: css`
    width: 764px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  `,
  editInfo: css`
    min-width: 780px;
    min-height: 48px;
    border: none;
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  `,
  full: css`
    min-width: 918px;
    min-height: 48px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  `,
  registerProduct: css`
    width: 954px;
    height: 48px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[400]};
  `,
};

const InputBox = styled.div`
  border: none;
  margin: 0px;
  outline: none;
  color: ${({ theme }) => theme.COLORS.gray[400]};
  padding-bottom: 30px;

  & > label {
    padding-left: 12px;
    color: ${({ theme }) => theme.COLORS["black"]};
    font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  }
`;

const Input = styled.input`
  padding-left: 16px;
  margin: 4px 0 4px;
  ${flexCenter};
  ${({ size }) => sizeCSS[size]}
`;

const Message = styled.p`
  margin-left: 16px;
  font-size: ${({ theme }) => theme.FONT_SIZE["extraSmall"]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT["regular"]};
  &:nth-of-type(1) {
    color: ${({ theme }) => theme.COLORS["error"]};
  }
  &:nth-of-type(2) {
    color: ${({ theme }) => theme.COLORS["access"]};
  }
`;
