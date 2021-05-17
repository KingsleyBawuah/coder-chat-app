import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow'
import MessageSender from "./MessageSender"
import Api from "../lib/api"

interface IChatRoomProps { }

const socket = Api.openMessageSocket()

const ChatRoom: React.FC<IChatRoomProps> = () => {
  const [connected, setConnected] = useState(false)

  const checkAlive = async () => {
    // Somewhat hacky way to deal with connection loss
    return Api.test().then(() => {
      setConnected(true)
    }).catch(() => {
      setConnected(false)
    })
  }

  useEffect(() => {
    socket.addEventListener('open', () => {
      setConnected(true)
      setInterval(checkAlive, 5000)
    })

    //Handlers for websocket related issues.
    socket.addEventListener('close', () => {
      setConnected(false)
    })

    socket.addEventListener('error', () => {
      setConnected(false)
    })
  }, [])

  return (
    <div>
      <ChatWindow socket={socket} socketConnected={connected} />
      <MessageSender socketConnected={connected} />
    </div>
  );
};

export default ChatRoom;
