import React from "react";
import { selectCurrentRoom } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

export const SideBar = () => {
  const roomid = useSelector(selectCurrentRoom);
  return (
    <div className="side-bar">
      <div>
        <h1>Welcome to the chat app</h1>
        <h2>Invite people to join this room with the id: {roomid}</h2>
        <p>You can start a conversation by clicking on any user in the left.</p>
      </div>
    </div>
  );
};
