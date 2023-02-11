import { useEffect, useRef } from "react";
import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";
import {
  updateActiveContact,
  setReadMessages,
  selectActiveContact,
} from "../chatroom/chatSlice";
import { useGetMessagesQuery } from "../message/messageApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";

function MessageList() {
  const { idroom, username } = useParams();
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery({ idroom, username });
  let content;

  useEffect(() => {
    dispatch(setReadMessages(username));
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [messages]);

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <div className="message-list-container">
        <ul className="message-list">
          {messages.map((message, i) => {
            return (
              <li key={message.id}>
                <Message message={message} />
              </li>
            );
          })}
          <div ref={bottomRef}></div>
        </ul>
      </div>
    );
  }

  return content;
}

export default MessageList;
