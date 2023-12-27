import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useQuery } from "react-query";
import AuthApi from "apis/auth";
import { PRODUCT_QUERY_KEY } from "consts";
import MiniUserInfo from "./miniuser-Info";
import { useNavigate } from "react-router-dom";
import { useAuth } from "provider/auth-provider";

const MyPageModal = ({ setIsMyPageModal }) => {
  const navigate = useNavigate();
  const { SignOut } = useAuth();

  const { data: myPageData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PAGE_DATA],
    () => AuthApi.getMyPageData()
  );

  const onClickLogout = async () => {
    try {
      await SignOut();
      alert("로그아웃이 정상적으로 이뤄졌습니다.");
      window.location.replace("/");
    } catch (error) {
      error && alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const onClickMyPageBtn = () => {
    navigate(`/MMM/my-page`);
    setIsMyPageModal(false);
  };

  return (
    myPageData && (
      <>
        <Wrapper>
          <MiniUserInfo user={myPageData.User} />
          <ButtonGroup>
            <EventButton onClick={onClickMyPageBtn}>마이페이지</EventButton>
            <EventButton onClick={onClickLogout}>로그아웃</EventButton>
          </ButtonGroup>
        </Wrapper>
      </>
    )
  );
};

export default MyPageModal;

const Wrapper = styled.div`
  width: 260px;
  height: 130px;
  z-index: 100;
  background: white;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  position: absolute;
  top: 70px;
  right: 2%;
  ${flexCenter}
  flex-direction: column;
  padding: 10px 0;
`;

const ButtonGroup = styled.div`
  ${flexCenter}
  flex-direction: row;
  width: 80%;
  margin-top: 14px;
  justify-content: space-evenly;
`;

const EventButton = styled.button`
  width: 90px;
  height: 28px;
  background-color: white;
  border: 1px solid navy;
  border-radius: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.COLORS.primary["navy"]};
  text-align: center;
  cursor: pointer;
  transition: all 0.6s;

  &:hover {
    background-color: navy;
    color: white;
  }
`;
