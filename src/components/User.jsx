import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const User = ({ user, conversation }) => {
  const shortenString = (str) => {
    return str.length > 20 ? `${str.substring(0, 20)}..` : str;
  };
  return (
    <div className={`user ${user.status}`}>
      {conversation?.unreadMessages > 0 && (
        <div className="notification-count">{conversation.unreadMessages}</div>
      )}

      <div className="user-icon-wrapper">
        <FontAwesomeIcon
          icon={faUser}
          className="profile-info-icon user-icon"
        />
      </div>
      <div className="username">
        <div>{shortenString(user.username)}</div>
        <p className="last-message">
          {conversation?.lastMessage
            ? shortenString(conversation?.lastMessage)
            : "Click to start a conversation"}
        </p>
      </div>
    </div>
  );
};
