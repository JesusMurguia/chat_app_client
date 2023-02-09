import { selectCurrentRoom, selectCurrentUser } from "../auth/authSlice";
import {
  updateActiveContact,
  selectActiveContact,
} from "../chatroom/chatSlice";
import { useGetConversationsQuery } from "./conversationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConversationsList = () => {
  const room = useSelector(selectCurrentRoom);
  const currentUser = useSelector(selectCurrentUser);
  const activeContact = useSelector(selectActiveContact);
  const dispatch = useDispatch();
  const {
    data: conversations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetConversationsQuery(room);

  let content;

  const navigate = useNavigate();
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section>
        <h1>Conversations</h1>
        <ul>
          {conversations.map((conversation, i) => {
            if (conversation.sender != currentUser.username)
              return (
                <li
                  key={conversation.id}
                  onClick={() => {
                    dispatch(updateActiveContact(conversation.sender));
                    navigate("user/" + conversation.sender);
                  }}
                >
                  {conversation.sender}{" "}
                  {activeContact !== conversation.sender &&
                    conversation.unreadMessages > 0}
                </li>
              );
          })}
        </ul>
      </section>
    );
  }

  return content;
};

export default ConversationsList;
