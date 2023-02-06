import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentRoom,
  selectCurrentToken,
} from "../auth/authSlice";

import React, { useEffect } from "react";
import UsersList from "../users/UsersList";

import {
  startConnecting,
  connectionEstablished,
  receiveAllMessages,
  receiveMessage,
  submitMessage,
  selectIsConnected,
} from "../chatroom/chatSlice";
import StatusSwitcher from "./StatusSwitcher";

const ChatRoom = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const room = useSelector(selectCurrentRoom);
  const isConnected = useSelector(selectIsConnected);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) {
      dispatch(startConnecting());
    }
  }, []);

  const welcome = user ? `Welcome ${user.username}!` : "Welcome!";
  const content = (
    <header>
      <h1>{welcome}</h1>
      <StatusSwitcher />
      <p>Room: {room}</p>
      <UsersList />
    </header>
  );
  return content;
};

export default ChatRoom;
