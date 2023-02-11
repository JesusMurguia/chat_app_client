import React from "react";
import { ContactInfo } from "./ContactInfo";
import { SideBar } from "./SideBar";
import { useParams } from "react-router-dom";
import MessageList from "../features/chatroom/MessageList";
import SendMessage from "./SendMessage";

export const Conversation = () => {
  const { idroom, username } = useParams();
  return (
    <>
      {username ? (
        <section className="conversation">
          <ContactInfo />
          <MessageList />
          <SendMessage />
        </section>
      ) : (
        <>
          <SideBar />
        </>
      )}
    </>
  );
};
