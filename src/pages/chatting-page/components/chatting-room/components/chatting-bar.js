import styled from "styled-components";
import { useQuery } from "react-query";
import { CHAT_QUERY_KEY, PRODUCT_QUERY_KEY } from "consts";
import { useRecoilState, useRecoilValue } from "recoil";
import { buyerChatDataIndex } from "store";
import { Api, chatApi } from "apis";
import { isCreateChat } from "store";
import { useState } from "react";
import { useSocket } from "socket/socket";
import { useSearchParams } from "react-router-dom";
import ChatProductIdxRepository from "repository/chatting-idx-repository";
import LoginUserNickNameRepository from "repository/login-user-nickName-repository";
import { test } from "store";
import { useEffect } from "react";
import { targetChatRoom } from "store";

const ChattingBar = () => {
  const myNickName = LoginUserNickNameRepository.getUserNickName();
  const { chatLog } = useSocket();

  return (
    <S.Wrapper>
      {chatLog?.map((chat) => {
        if (chat.nick_name === myNickName) {
          return (
            <S.MarketerFlex>
              <S.MarketerBar>{chat.message}</S.MarketerBar>
            </S.MarketerFlex>
          );
        }

        return <S.BuyerBar>{chat.message}</S.BuyerBar>;
      })}
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

const S = {
  Wrapper,
  BuyerBar,
  MarketerFlex,
  MarketerBar,
};
