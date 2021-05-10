import React, { useState, ChangeEvent } from 'react';
import Api from "../lib/api"


interface IMessageSenderProps { }

const MessageSender: React.FC<IMessageSenderProps> = () => {

  const [message, setMessage] = useState("")

  const handleTextInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const sendMessage = () => {
    const msg = message
    setMessage("")
    return Api.postMessage({
      from: localStorage.getItem("username") || "",
      body: msg
    })
  }

  return (
    <div style={{
      "display": "flex"
    }}>
      <textarea
        // contentEditable
        // suppressContentEditableWarning={true}
        placeholder={"Enter a message"}
        value={message}
        onChange={handleTextInput}
        className="textArea" style={{
          "float": "left",
          "width": "80%",
          "border": "1px solid black",
          "height": "90px"
        }}>
      </textarea>
      <button
        onClick={sendMessage}
        style={{
          "float": "right",
          "width": "20%"
        }}>
        {"Send Message"}
      </button>
    </div>
  );
};

export default MessageSender;
