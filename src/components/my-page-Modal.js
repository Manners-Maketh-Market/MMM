import { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useMutation, useQuery } from "react-query";
import { Api } from "apis";
import { PRODUCT_QUERY_KEY } from "consts";
import MiniUserInfo from "./miniuser-Info";
import { useNavigate } from "react-router-dom";

const MyPageModal = ({ user, setIsMyPageModal }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    {
      isModalOpen === true ? setIsModalOpen(false) : setIsModalOpen(true);
    }
  };
  const { data: myPageData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_MY_PAGE_DATA],
    () => Api.getMyPageData()
  );
  console.log("myPageData:", myPageData);
  const { data: userLogoutData } = useQuery(
    [PRODUCT_QUERY_KEY.GET_USER_LOGOUT_DATA],
    () => Api.getUserLogout()
  );

  const mutation = useMutation(() => Api.getUserLogout());

  const onClickLogout = async () => {
    try {
      const logoutUser = mutation.mutateAsync();
      alert("로그아웃이 정상적으로 이뤄졌습니다.");
      navigate("/sign-in");
      console.log("logout success:", logoutUser);
    } catch (error) {
      console.log("logout error:", error);
    }
  };

  const onClickMyPageBtn = () => {
    navigate(`/my-page`);
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
  width: 240px;
  height: 100px;
  z-index: 100;
  background: white;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  position: absolute;
  top: 70px;
  right: 2%;
  ${flexCenter}
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  ${flexCenter}
  flex-direction: row;
  width: 80%;
  margin-top: 10px;
  justify-content: space-evenly;
`;

const EventButton = styled.button`
  width: 70px;
  height: 24px;
  background-color: white;
  border: 1px solid navy;
  border-radius: 4px;
  font-size: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: navy;
    color: white;
  }
`;
