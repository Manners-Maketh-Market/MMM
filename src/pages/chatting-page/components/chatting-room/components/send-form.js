import { chatApi } from "apis";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCreateChat } from "store";
import styled from "styled-components";
import { useState } from "react";
import { useSocket } from "socket/socket";
import LoginUserNickNameRepository from "repository/login-user-nickName-repository";
import { CHAT_QUERY_KEY } from "consts";
import { targetChatRoom } from "store";

const SendForm = () => {
  const { sendMessage } = useSocket();

  const myNickName = LoginUserNickNameRepository.getUserNickName();

  const setIsCreateChat = useSetRecoilState(isCreateChat);
  const targetChatRoomData = useRecoilValue(targetChatRoom);

  const [textValue, setTextValue] = useState();

  const client = useQueryClient();

  const { mutateAsync: saveChatRoom } = useMutation({
    mutationFn: chatApi.postSaveChatRoom,
  });

  const onSendMessage = async (e) => {
    e.preventDefault();

    try {
      const sendMessageData = {
        title: targetChatRoomData.productTitle,
        createdAt: new Date(),
        prod_idx: targetChatRoomData.productId,
        room_idx: targetChatRoomData.roomId,
        nick_name: myNickName,
        message: e.target.chatMessage.value,
        isSeller: true,
      };

      await saveChatRoom({
        room_idx: targetChatRoomData.roomId,
        message: e.target.chatMessage.value,
      });
      await client.invalidateQueries(CHAT_QUERY_KEY.GET_CHAT_LOG);
      setIsCreateChat((prev) => !prev);
      setTextValue("");
      sendMessage(sendMessageData);
    } catch (error) {
      console.log(error);
      alert("메세지 전송 실패");
    }
  };

  return (
    <>
      <S.SendFormBox onSubmit={onSendMessage}>
        <S.SendMessage
          placeholder="메세지를 입력하세요."
          name="chatMessage"
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
        ></S.SendMessage>
        {textValue === "" ? (
          <S.SendBtn disabled="disabled">전송</S.SendBtn>
        ) : (
          <S.SendBtn>전송</S.SendBtn>
        )}
      </S.SendFormBox>
    </>
  );
};

export default SendForm;

const SendFormBox = styled.form`
  position: relative;
  position: absolute;
  bottom: 1%;
  left: 2.5%;
`;

const SendBtn = styled.button`
  position: absolute;
  width: 80px;
  height: 40px;
  right: 15px;
  bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.primary.logo};
  }
`;

const SendMessage = styled.textarea`
  border-radius: 4px;
  width: 694px;
  height: 148px;
  border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
  padding: 15px;
  resize: none;
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.DEVICE.tablet} {
    width: 570px;
    height: 100px;
  }
  @media ${({ theme }) => theme.DEVICE.mobile} {
    width: 424px;
  }
`;

const S = {
  SendFormBox,
  SendMessage,
  SendBtn,
};
