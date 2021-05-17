import React, { useEffect, useState } from 'react';
import { Message } from '../../types/message';
import { createUseStyles } from "react-jss"

interface IChatWindowProps { socket: any, socketConnected: boolean }

const ChatWindow: React.FC<IChatWindowProps> = ({ socket, socketConnected }: IChatWindowProps) => {
  const [messageList, setMessageList] = useState<Array<Message>>([])

  const styles = useStyles()

  useEffect(() => {
    // Listen for messages
    socket.addEventListener('message', (event: MessageEvent) => {
      const newMessage = JSON.parse(event.data)
      handleNewMessage(newMessage);
    });
  }, [])

  const handleNewMessage = (messageData: any) => {
    if (messageData.type === "message") {
      setMessageList(oldMessageList => [...oldMessageList, messageData.data])
    }
  }

  return (
    !socketConnected ? (<h1>{"Disconnected from chat....please refresh"}</h1>) : <div className={styles.chatboxContainer}>
      <span
        className={styles.chatboxInner}>
        {messageList.map((msg) => {
          return (
            <div className={styles.messageContainer} key={msg.time}>
              <div className={styles.messageFrom}>{`${msg.from}:`}</div>
              <div className={styles.messageBody}>
                {msg.body}
              </div>
              <div className={styles.messageTime}>
                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <br></br>
            </div>
          )
        })}
      </span>

    </div>
  );
};

const useStyles = createUseStyles({
  chatboxContainer: {
    "display": "flex",
    "overflowY": "scroll",
    "width": "100%"
  },
  chatboxInner: {
    "width": "100%"
  },
  messageContainer: {
    "overflow": "auto"
  },
  messageFrom: {
    "float": "left", "paddingRight": "10px", "fontWeight": "bold"
  },
  messageBody: {
    "float": "left"
  },
  messageTime: {
    "float": "right",
    "color": "#737171"
  }
})


export default ChatWindow;
