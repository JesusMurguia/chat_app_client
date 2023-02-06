import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentRoom,
  selectCurrentToken,
} from "../auth/authSlice";

import React from "react";
import UsersList from "../users/UsersList";

const ChatRoom = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const room = useSelector(selectCurrentRoom);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const content = (
    <header>
      <h1>{welcome}</h1>
      <p>Room: {room}</p>
      <UsersList />
    </header>
  );
  return content;
};

export default ChatRoom;
