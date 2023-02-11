import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEllipsisV,
  faPhone,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { selectActiveContact } from "../features/chatroom/chatSlice";
import { useSelector } from "react-redux";

export const ContactInfo = () => {
  const user = useSelector(selectActiveContact);
  return (
    <div className={`profile-info`}>
      <div className="user-icon-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-info-icon " />
      </div>
      <div className="user-info">
        <div className="user-info-name">{user.username}</div>
        <div className="user-info-subtitle"></div>
      </div>
      <div className="useless-buttons">
        <button className="user-info-button">
          <FontAwesomeIcon icon={faPhone} className="user-info-button-icon" />
        </button>
        <button className="user-info-button">
          <FontAwesomeIcon icon={faCamera} className="user-info-button-icon" />
        </button>
        <button className="user-info-button">
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="user-info-button-icon"
          />
        </button>
      </div>
    </div>
  );
};
