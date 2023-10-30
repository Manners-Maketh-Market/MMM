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
    border: 1px solid ${({ theme }) => theme.COLORS.primary["navy"]};
    background-color: ${({ theme }) => theme.COLORS["white"]};
    color: ${({ theme }) => theme.COLORS.primary["navy"]};
  `,
  disabled: css`
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
    height: 48px;
    border-radius: 4px;
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
  cursor: pointer;
  transition: all 0.6s;

  &:hover {
    background-color: #282190;
    color: #fff;
  }
`;
