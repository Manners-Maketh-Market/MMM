import styled from "styled-components";
import css from "styled-components";
import { flexCenter } from "styles/common.style";

const Search = ({ ...inputProps }) => {
  return (
    <>
      <Input {...inputProps} />
    </>
  );
};
export default Search;

const Input = styled.input`
  position: relative;
  width: 280px;
  height: 40px;
  border-radius: 62px;
  background-color: ${({ theme }) => theme.COLORS.gray[100]};
  ${flexCenter};
  margin-bottom: 16px;
  border: none;
  outline: none;
  padding: 0 50px 0 20px;
  color: #757575;
`;
