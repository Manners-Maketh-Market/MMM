import styled from "styled-components";
import { useSocket } from "socket/socket";
import LoginUserNickNameRepository from "repository/login-user-nickName-repository";
import { useEffect, useRef } from "react";

const ChattingBar = () => {
  const wrapperRef = useRef(null);

  const myNickName = LoginUserNickNameRepository.getUserNickName();

  const { chatLog } = useSocket();

  const chatTimeRender = (chatCreatedTime) => {
    const chatTime = new Date(chatCreatedTime);
    const chatTimeHours = chatTime.getHours();
    const chatTimeMinutes = chatTime.getMinutes();
    const amOrPm = chatTimeHours >= 12 ? "오후" : "오전";
    const formattedHours = chatTimeHours % 12 || 12;
    return `${amOrPm} ${formattedHours}시 ${chatTimeMinutes}분`;
  };

  // 채팅 창 스크롤을 항상 최하단에 위치 시키는 로직
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <S.Wrapper ref={wrapperRef}>
      {chatLog?.map((chat) => (
        <>
          {chat.nick_name === myNickName ? (
            <S.MarketerFlex>
              <S.TimeBar>{chatTimeRender(chat.createdAt)}</S.TimeBar>
              <S.MarketerBar>{chat.message}</S.MarketerBar>
            </S.MarketerFlex>
          ) : (
            <S.BuyerFlex>
              <S.BuyerBar>{chat.message}</S.BuyerBar>
              <S.TimeBar>{chatTimeRender(chat.createdAt)}</S.TimeBar>
            </S.BuyerFlex>
          )}
        </>
      ))}
    </S.Wrapper>
  );
};

export default ChattingBar;

const Wrapper = styled.div`
  height: 380px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 50px;
`;

const BuyerBar = styled.p`
  margin: 12px;
  width: max-content;
  padding: 10px;
  border-radius: 24px;
  background-color: rgba(40, 33, 144, 0.1);
  max-width: 400px;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
`;

const MarketerFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BuyerFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MarketerBar = styled.p`
  margin: 6px 12px;
  width: max-content;
  padding: 10px;
  border-radius: 24px;
  color: ${({ theme }) => theme.COLORS.white};
  background-color: ${({ theme }) => theme.COLORS.primary.logo};
  max-width: 400px;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
`;

const TimeBar = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  color: ${({ theme }) => theme.COLORS.gray[300]};
`;

const S = {
  Wrapper,
  BuyerBar,
  MarketerFlex,
  MarketerBar,
  BuyerFlex,
  TimeBar,
};
