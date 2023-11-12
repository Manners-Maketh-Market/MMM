import MMMButton from "components/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const Error404 = () => {
  const navigate = useNavigate();

  const onGoMainPage = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <ErrorStatus>404</ErrorStatus>
      <Head>원하시는 페이지를 찾을 수 없습니다.</Head>
      <Content>
        찾으시려는 페이지의 주소가 잘못 입력되었거나, 주소의 변경 혹은 삭제로
        인해 사용하실 수 없습니다.
      </Content>
      <Content>
        입력하신 페이지의 주소가 정확한지 다시 한 번 확인해 주세요.
      </Content>
      <br />
      <MMMButton variant="secondary" size="more" onClick={onGoMainPage}>
        HOME
      </MMMButton>
    </Wrapper>
  );
};
export default Error404;

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
