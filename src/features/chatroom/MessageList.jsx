import { useEffect } from "react";
import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";
import { updateActiveContact, setReadMessages } from "../chatroom/chatSlice";
import { useGetMessagesQuery } from "../message/messageApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function MessageList() {
  const { idroom, username } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
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

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section>
        <h1>Messages</h1>
        <ul>
          {messages.map((message, i) => {
            return (
              <li key={message.id}>
                {`${message.sender}: ${message.content}`}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return content;
}

export default MessageList;
