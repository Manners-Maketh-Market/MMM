import { css, styled } from "styled-components";

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
};

const sizeCSS = {
  more: css`
    width: 97px;
    height: 38px;
    border-radius: 8px;
  `,
  medium: css`
    width: 220px;
    height: 60px;
    border-radius: 4px;
  `,
  large: css`
    width: 330px;
    height: 48px;
    border-radius: 6px;
  `,
  full: css`
    width: 860px;
    height: 100px;
    border-radius: 10px;
  `,
};

const Button = styled.button`
  ${({ variant }) => variantCSS[variant]} // primary
  ${({ size }) => sizeCSS[size]}
  border: none;
  cursor: pointer;
  transition: all 0.3s;
`;
