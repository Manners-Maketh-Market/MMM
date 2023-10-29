import styled from "styled-components";
import { flexCenter } from "styles/common.style";

export const Form = styled.form`
  width: 360px;
  background-color: ${({ theme }) => theme.COLORS.white};
  ${flexCenter};
  flex-direction: column;
  padding: 32px 0 0 0;
`;
