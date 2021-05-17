import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Api from "../lib/api"
import { createUseStyles } from "react-jss"


interface IMessageSenderProps { socketConnected: boolean }

const MessageSender: React.FC<IMessageSenderProps> = ({ socketConnected }: IMessageSenderProps) => {
  const [message, setMessage] = useState("")
  const [messageValid, setMessageValid] = useState(true)
  const styles = useStyles()

  const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
    setMessageValid(validateMessage(event.target.value))
  }

  const validateMessage = (message: string): boolean => (message.length < 1 || message.length > 200) ? false : true

  const sendMessage = async (event: MouseEvent) => {
    try {
      setMessageValid(validateMessage(message))
      event.preventDefault()
      await Api.postMessage({
        from: localStorage.getItem("username") || "",
        body: message
      });
      setMessage("");
    } catch (e) {
      window.alert("Error sending message, please refresh")
    }
  }

  return (
    <form className={styles.formContainer}>
      <div className={styles.messageBox}>
        <input
          placeholder={"Enter a message"}
          value={message}
          onChange={handleTextInput}
          className={styles.messageInput}>
        </input>
        <button
          style={!messageValid || !socketConnected ? {
            "backgroundColor": "grey"
          } : {}}
          onClick={sendMessage}
          disabled={!messageValid || !socketConnected}
          className={styles.sendMessageBtn}>
          <p>{"Send"}</p>
        </button>
      </div>
      <span className={styles.messageError}>
        {!messageValid && "Please enter a message between 0 and 200 characters"}
      </span>
    </form>

  );
};

const useStyles = createUseStyles({
  formContainer: {
    "position": "fixed",
    "bottom": "0",
    "width": "100%",
  },
  messageBox: {
    "display": "flex",
    "padding": "10px",
    "borderCollapse": "collapse",
    "backgroundColor": "gray"
  },
  messageInput: {
    "float": "left",
    "width": "100%",
    "border": "1px solid black",
    "height": "50px",
    "resize": "none",
    "marginRight": "10px"
  },
  sendMessageBtn: {
    "float": "right",
    "width": "150px",
    "backgroundColor": "black",
    "color": "white"
  },
  messageError: {
    "color": "red"
  }
})

export default MessageSender;
