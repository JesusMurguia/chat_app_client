import React, { useRef } from "react";
import MessageList from "./MessageList";

function Conversation() {
  const messageRef = useRef();

  const handleSendMessage = () => {
    console.log(`message is: ${messageRef.current.value}`);
  };
  return (
    <div>
      <MessageList />
      <div>
        <input
          ref={messageRef}
          type="text"
          placeholder="write message.."
        ></input>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Conversation;
