import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectCurrentRoom } from "../auth/authSlice";

import React, { useEffect } from "react";
import {
  startConnecting,
  selectIsConnected,
  endConnection,
} from "../chatroom/chatSlice";

import { UserInfo } from "../../components/UserInfo";

const ChatRoom = () => {
  const user = useSelector(selectCurrentUser);
  const room = useSelector(selectCurrentRoom);
  const isConnected = useSelector(selectIsConnected);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) {
      dispatch(startConnecting());
    }

    return () => {
      dispatch(endConnection());
    };
  }, []);

  const welcome = user ? `Welcome ${user.username}!` : "Welcome!";
  const content = (
    <section id="chatroom">
      <UserInfo />
      <div className="users">
        <div className="search-bar">
          <label>
            search
            <input />
          </label>
        </div>
        <div className="users-list">users list</div>
      </div>
      <div className="messages-list">messages</div>
      <div className="conversation">
        <div className="active-contact">contact user</div>
        <div className="messages">messages</div>
        <div className="send-message">
          <label>
            send message
            <input />
          </label>
        </div>
      </div>
    </section>
  );
  return content;
};

export default ChatRoom;
{
  /* <header>
        <h1>{welcome}</h1>
        <StatusSwitcher />
        <p>Room: {room}</p>
        <UsersList />
        <ConversationsList />
      </header>
      <Outlet /> */
}
