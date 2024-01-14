import MMMButton from "components/button";
import UseNavigation from "hooks/use-navigation";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";

const Error500 = () => {
  const { goToLoginPage } = UseNavigation();

  const onGoMainPage = () => {
    goToLoginPage();
  };
  return (
    <Wrapper>
      <ErrorStatus>500</ErrorStatus>
      <Head>웹사이트에서 해당 페이지를 표시할 수 없습니다.</Head>
      <Content>만약 문제가 지속된다면, 해당 문제를 발생시킨 문제와 에러 메세지를 언급해 고객센터로 신고해주세요.</Content>
      <Content>불편을 드려 정말 죄송합니다.</Content>
      <br />
      <MMMButton variant="secondary" size="more" onClick={onGoMainPage}>
        HOME
      </MMMButton>
    </Wrapper>
  );
};
export default Error500;

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
