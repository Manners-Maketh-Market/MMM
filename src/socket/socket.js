import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { SocketTokenRepository } from "repository/socket-token-repository";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const socket = io(process.env.REACT_APP_BACKEND_URL);

const SocketProvider = ({ children }) => {
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (!socket) socket.connect();
    const token = SocketTokenRepository.getToken();
    if (token) socket.emit("connect-user", { socket: token });

    socket.on("receiveMessage", (data) => {
      setChatLog((prev) => [
        ...prev,
        {
          nick_name: data.nick_name,
          message: data.message,
        },
      ]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const joinChatRoom = (roomId) => {
    socket.emit("join", { room_idx: roomId });
  };

  const sendMessage = (messageData) => {
    setChatLog((prev) => [
      ...prev,
      {
        nick_name: messageData.nick_name,
        message: messageData.message,
      },
    ]);
    socket.emit("sendMessage", messageData);
  };

  const useSocketValue = {
    socket,
    joinChatRoom,
    sendMessage,
    // receiveMessage,
    chatLog,
    setChatLog,
  };

  return (
    <SocketContext.Provider value={useSocketValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
