import React from "react";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";

const Message = ({ message }) => {
  const { username } = useParams();
  console.log(message);
  return (
    <div
      className={`message ${
        username === message.sender ? "sender" : "receiver"
      }`}
    >
      {message.content}
      <div className="date">
        {formatDistance(new Date(message.date), new Date(), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};

export default Message;
