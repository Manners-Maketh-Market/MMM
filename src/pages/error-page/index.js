import styled from "styled-components";
import MMMlogo from "../../images/logo/MMMlogo.png";
import { flexCenter } from "styles/common.style";
import Error404 from "./components/error404";
import Error403 from "./components/error403";
import Error500 from "./components/error500";

const ErrorPage = ({ status }) => {
  return (
    <Wrapper>
      <LogoImg src={MMMlogo} alt="logo" />
      {status === 403 && <Error403 />}
      {status === 404 && <Error404 />}
      {status === 500 && <Error500 />}
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  @media ${({ theme }) => theme.DEVICE.mobile} {
    padding-top: 80px;
  }
`;

const LogoImg = styled.img`
  width: 320px;
  height: 108px;
`;
