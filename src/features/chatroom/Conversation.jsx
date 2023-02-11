import React, { useRef } from "react";
import MessageList from "./MessageList";
import { selectActiveContact, submitMessage } from "../chatroom/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";

function Conversation() {
  const messageRef = useRef();
  const activeContact = useSelector(selectActiveContact);
  const user = useSelector(selectCurrentUser);
  const room = useSelector(selectCurrentRoom);
  const dispatch = useDispatch();

  return (
    <div>
      <MessageList />
      <div>
        <input
          ref={messageRef}
          type="text"
          placeholder="write message.."
        ></input>
        <button
          onClick={() => {
            const message = {
              id: nanoid(),
              sender: user.username,
              content: messageRef.current.value,
              receiver: activeContact.username,
              room,
              status: "DELIVERED",
            };
            messageRef.current.value = "";
            dispatch(submitMessage(message));
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
