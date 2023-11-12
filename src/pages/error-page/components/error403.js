import MMMButton from "components/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const Error403 = () => {
  const navigate = useNavigate();

  const onGoLoginPage = () => {
    navigate("/sign-in");
  };
  return (
    <Wrapper>
      <ErrorStatus>403</ErrorStatus>
      <Head>해당 페이지에 대한 권한이 없습니다.</Head>
      <Content>
        웹사이트에서 이 웹 페이지 표시를 거부했습니다. 이 웹 페이지를 보려면
        로그인해야 합니다.
      </Content>
      <Content>아래 버튼을 클릭한 후 로그인 해주세요.</Content>
      <br />
      <MMMButton variant="secondary" size="more" onClick={onGoLoginPage}>
        LOGIN
      </MMMButton>
    </Wrapper>
  );
};
export default Error403;

const Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const ErrorStatus = styled.div`
  color: rgba(40, 33, 144, 0.5);
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: 200px;
  margin-top: 100px;
`;

const Head = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
  margin-top: 44px;
  margin-bottom: 80px;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  margin-bottom: 12px;
`;
