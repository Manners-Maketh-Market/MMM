import { css, styled } from "styled-components";
import { flexCenter } from "styles/common.style";

const MMMButton = ({ variant, size, children, ...rest }) => {
  return (
    <Button variant={variant} size={size} {...rest}>
      {children}
    </Button>
  );
};
export default MMMButton;

const variantCSS = {
  primary: css`
    background-color: ${({ theme }) => theme.COLORS.primary["navy"]};
    color: ${({ theme }) => theme.COLORS.font};
  `,
  // disabled button color
  secondary: css`
    background-color: ${({ theme }) => theme.COLORS.gray[400]};
  `,

  detailG: css`
    background-color: #d4d3e1;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  `,
  // MoreButton CSS
  More: css`
    ${flexCenter}
    width:97px;
    height: 38px;
    border-radius: 8px;
    margin: 60px auto 0;
    cursor: pointer;
    font-size: 14px;
    background-color: #fff;
  `,

  detailB: css`
    background-color: #282190;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  `,
};

const sizeCSS = {
  more: css`
    width: 97px;
    height: 38px;
    border-radius: 8px;
  `,
  medium: css`
    width: 264px;
    height: 56px;
    border-radius: 8px;
  `,
  confirm: css`
    width: 313px;
    height: 48px;
    border-radius: 4px;
    margin-left: 20px;
  `,
  large: css`
    width: 330px;
    height: 48px;
    border-radius: 6px;
  `,
  full: css`
    width: 918px;
    height: 48px;
    border-radius: 10px;
  `,
};

const Button = styled.button`
  ${({ variant }) => variantCSS[variant]} // primary
  ${({ size }) => sizeCSS[size]}
  border: none;
  cursor: pointer;
  transition: all 0.6s;

  &:hover {
    background-color: #282190;
    color: #fff;
  }
`;
