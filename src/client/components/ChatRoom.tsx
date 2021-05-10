import React from 'react';
import { navigate } from 'hookrouter';
import ChatWindow from './ChatWindow'
import MessageSender from "./MessageSender"
interface IChatRoomProps {

}

const ChatRoom: React.FC<IChatRoomProps> = () => {
  return (
    <div>
      <ChatWindow />
      <MessageSender />
    </div>
  );
};

export default ChatRoom;
