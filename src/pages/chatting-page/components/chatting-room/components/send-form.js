import { Api } from 'apis';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isCreateChat } from 'store';
import styled from 'styled-components';
import ChattingBar from './chatting-bar';
import { buyerChatDataIndex } from 'store';
import { useEffect, useRef, useState } from 'react';

const SendForm = () => {
    const setIsCreateChat = useSetRecoilState(isCreateChat);
    const readBuyerChatListIndex = useRecoilValue(buyerChatDataIndex);

    const [textValue, setTextValue] = useState();

    const { mutate } = useMutation((chatData) => Api.postMyChatData(chatData));

    const onSendMessage = (e) => {
        e.preventDefault();
        const chatData = {
            message: e.target.chatMessage.value,
            buyerUserIndex: readBuyerChatListIndex,
        };
        const bodyData = JSON.stringify(chatData);
        mutate(bodyData);
        setIsCreateChat((prev) => !prev);
        setTextValue('');
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
                {textValue === '' ? <S.SendBtn disabled="disabled">전송</S.SendBtn> : <S.SendBtn>전송</S.SendBtn>}
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
    font-size: ${({ theme }) => theme.FONT_SIZE['small']};
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
