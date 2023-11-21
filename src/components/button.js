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
    color: ${({ theme }) => theme.COLORS["white"]};
  `,
  secondary: css`
    border: 1px solid ${({ theme }) => theme.COLORS.primary["navy"]};
    background-color: ${({ theme }) => theme.COLORS["white"]};
    color: ${({ theme }) => theme.COLORS.primary["navy"]};
  `,
  disabled: css`
    background-color: ${({ theme }) => theme.COLORS.gray[400]};
  `,

  detailG: css`
    background-color: #d4d3e1;
    color: #fff;
    font-size: 18px;
    font-weight: 500;

    @media ${({ theme }) => theme.DEVICE.mobile} {
      font-size: 16px;
    }
  `,

  detailY: css`
    background-color: #ffd02c;
    color: #fff;

    font-size: 18px;
    font-weight: 500;

    @media ${({ theme }) => theme.DEVICE.mobile} {
      font-size: 16px;
    }
  `,
  More: css`
    ${flexCenter}
    width:97px;
    height: 38px;
    border-radius: 8px;
    margin: 60px auto 0;
    font-size: 14px;
    background-color: #fff;
  `,
  detailB: css`
    background-color: #282190;
    color: #fff;
    font-size: 18px;
    font-weight: 500;

    @media ${({ theme }) => theme.DEVICE.mobile} {
      font-size: 16px;
    }
  `,
};

const sizeCSS = {
  more: css`
    width: 97px;
    height: 36px;
    border-radius: 8px;
  `,
  small: css`
    min-width: 200px;
    min-height: 46px;
    border-radius: 4px;
    margin-left: 12px;
  `,
  medium: css`
    width: 264px;
    height: 56px;
    border-radius: 8px;

    @media ${({ theme }) => theme.DEVICE.mobile} {
      width: 175px;
      height: 44px;
    }
  `,
  confirm: css`
    min-width: 313px;
    min-height: 46px;
    border-radius: 4px;
    margin-left: 20px;
  `,
  large: css`
    max-width: 330px;
    max-height: 46px;
    border-radius: 6px;
  `,
  full: css`
    max-width: 918px;
    max-height: 46px;
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
