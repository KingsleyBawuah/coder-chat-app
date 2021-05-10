import React, { useEffect, useState } from 'react';
import { Message } from '../../types/message';
import Api from "../lib/api"

interface IChatWindowProps { }

const ChatWindow: React.FC<IChatWindowProps> = () => {
  const [messageList, setMessageList] = useState<Array<Message>>([])
  console.log('messageList: ', messageList);

  const handleNewMessage = (messageData: any) => {
    if (messageData.type === "message") {
      console.log('Message from server ', messageData.data);
      setMessageList(oldMessageList => [...oldMessageList, messageData.data])
    }
  }
  useEffect(() => {
    // Create WebSocket connection.
    const socket = Api.openMessageSocket()
    console.log('socket: ', socket);

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data)
      handleNewMessage(newMessage);
    });

  }, [])
  return (
    <div className='textarea' style={{
      "height": "500px",
      "border": "1px solid black",
      "display": "flex",
      "overflowY": "scroll"
    }}>
      <span
        style={{ "width": "100%" }}>
        {messageList.map((msg) => {
          return (
            <div style={{
              "overflow": "auto"
            }} key={msg.time}>
              <div style={{ "float": "left", "paddingRight": "10px", "fontWeight": "bold" }}>{`${msg.from}:`}</div>
              <div style={{ "float": "left" }}>
                {msg.body}
              </div>
              <div style={{
                "float": "right",
                "color": "#aaa"
              }}>
                {new Date(msg.time).toLocaleString()}
              </div>
              <br></br>
            </div>
          )
        })}
      </span>

    </div>
  );
};

export default ChatWindow;
