import styled from "styled-components";
import { flexCenter } from "styles/common.style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatIcon from "../images/icon/chaticon.png";
import ScrollTopIcon from "../images/icon/scrolltop.png";

const ScrollIcon = () => {
  // iconSet가 일정길이 내렸을 때 나올지,,, 아니면 그냥 존재할지 투표
  const [isShowButton, setIsShowButton] = useState(false);

  const navigate = useNavigate();

  const onGoChattingPage = () => {
    navigate("/MMM/chat");
    window.scroll({
      top: 0,
    });
  };

  const onHandleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setIsShowButton(true) : setIsShowButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onHandleScroll);

    return () => {
      window.removeEventListener("scroll", onHandleScroll);
    };
  }, []);

  const onGoToScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (window.location.pathname === "/MMM/chat") return null;

  return (
    <S.IconContainer>
      {isShowButton && (
        <S.IconSet onClick={onGoToScrollTop}>
          <S.OneIcon src={ScrollTopIcon} />
        </S.IconSet>
      )}
      <S.IconSet>
        <S.OneIcon src={ChatIcon} onClick={onGoChattingPage} />
      </S.IconSet>
    </S.IconContainer>
  );
};

export default ScrollIcon;

const IconContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 50px;
`;

const IconSet = styled.div`
  ${flexCenter}
  background-color: ${({ theme }) => theme.COLORS.primary.navy};
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const OneIcon = styled.img`
  padding: 10px;
  width: 56px;
  height: 56px;
`;

const S = {
  IconContainer,
  IconSet,
  OneIcon,
};
