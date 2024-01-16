
import { chatApi } from 'apis';
import { CHAT_QUERY_KEY } from 'consts';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import LoginUserNickNameRepository from 'repository/login-user-nickName-repository';
import { useSocket } from 'context/socket.ctx';
import { currentChatUser } from 'store/chat-state';
import { targetChatRoom } from 'store/chat-state';
import styled from 'styled-components';
import { flexCenter } from 'styles/common.style';

const OneChat = ({ profileImg, nickName, productImg, roomId, index, productId, productTitle, price, lastMessage }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const targetChatIdx = searchParams.get('targetChatProductIdx') || undefined;
    const client = useQueryClient();

    const setTargetChatRoom = useSetRecoilState(targetChatRoom);
    const setCurrentChatUser = useSetRecoilState(currentChatUser);

    const { joinChatRoom, setChatLog } = useSocket();

    const myNickName = LoginUserNickNameRepository.getUserNickName();

    const onClickJoinChatRoom = async () => {
        try {
            // 채팅방 입장
            joinChatRoom(roomId);
            // 로컬스토리지에 저장 되어있는 product배열에 현재 클릭한 product index를 url에 저장
            searchParams.set('targetChatProductIdx', index);
            setSearchParams(searchParams);
            setTargetChatRoom({
                nickName,
                roomId,
                productImg,
                profileImg,
                productId,
                productTitle,
                price,
            });
            const data = await client.fetchQuery({
                queryFn: () => chatApi.getChatLog(roomId),
                queryKey: CHAT_QUERY_KEY.GET_CHAT_LOG,
            });

            const chatLogs = data.map((chat) => ({
                nick_name: chat.User.nick_name,
                message: chat.message,
                createdAt: chat.createdAt,
            }));

            setChatLog(chatLogs);

            const buyerNickName = chatLogs.find((el) => {
                return el.nick_name !== myNickName;
            });

            setCurrentChatUser(buyerNickName.nick_name);
        } catch {
            alert('채팅방 생성 실패');
        }
    };

    return (
        <S.Wrapper
            onClick={onClickJoinChatRoom}
            // useSearchParams.get으로 받아온 값은 string으로 읽히기 때문에 Number사용
            className={index === Number(targetChatIdx) ? 'FocusWrapper' : ''}
        >
            <S.BuyerInfo>
                <S.BuyerProfileImg src={profileImg} />
                <S.IdAndChat>
                    {/* <S.BuyerId>{nickName}</S.BuyerId> */}
                    <S.ChatContent>{lastMessage}</S.ChatContent>
                </S.IdAndChat>
            </S.BuyerInfo>
            <S.ProductImg src={productImg} />
        </S.Wrapper>
    );
};

export default OneChat;

const Wrapper = styled.div`
    width: 448px;
    height: 72px;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
    display: flex;
    justify-content: space-between;
    &.FocusWrapper {
        background-color: rgba(40, 33, 144, 0.1);
    }
    @media ${({ theme }) => theme.DEVICE.mobile} {
        &.FocusWrapper {
            background-color: white;
        }
    }
`;

const BuyerInfo = styled.div`
    ${flexCenter}
`;

const BuyerProfileImg = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[300]};
    margin: 10px;
`;

const IdAndChat = styled.div``;

const BuyerId = styled.div`
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
    color: ${({ theme }) => theme.COLORS.black};
`;

const ChatContent = styled.span`
    font-size: ${({ theme }) => theme.FONT_SIZE.extraSmall};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
    color: ${({ theme }) => theme.COLORS.gray[500]};
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
`;

const ProductImg = styled.img`
    width: 50px;
    height: 50px;
    margin: 10px 30px;
`;

const S = {
    Wrapper,
    BuyerProfileImg,
    BuyerId,
    ChatContent,
    ProductImg,
    IdAndChat,
    BuyerInfo,
};
