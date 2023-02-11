import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  selectActiveContact,
  submitMessage,
} from "../features/chatroom/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  selectCurrentRoom,
  selectCurrentUser,
} from "../features/auth/authSlice";

const SendMessage = (props) => {
  const messageRef = useRef();
  const activeContact = useSelector(selectActiveContact);
  const user = useSelector(selectCurrentUser);
  const room = useSelector(selectCurrentRoom);
  const dispatch = useDispatch();

  return (
    <form
      className="message-form"
      onSubmit={(e) => {
        e.preventDefault();
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
      <div className="send-message">
        <FontAwesomeIcon icon={faMessage} className="search-bar-icon" />
        <input
          className="search-bar-input"
          ref={messageRef}
          type="text"
          placeholder="write message.."
        ></input>
        <button>Send</button>
      </div>
    </form>
  );
};

export default SendMessage;
