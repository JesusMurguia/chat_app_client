import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, selectCurrentRoom } from "../auth/authSlice";

import React, { useEffect } from "react";
import {
  startConnecting,
  selectIsConnected,
  endConnection,
} from "../chatroom/chatSlice";

import { UserInfo } from "../../components/UserInfo";
import Users from "../../components/Users";
import { Conversation } from "../../components/Conversation";

const ChatRoom = () => {
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

  const content = (
    <section id="chatroom">
      <UserInfo />
      <Users />
      <Conversation />
    </section>
  );
  return content;
};

export default ChatRoom;
