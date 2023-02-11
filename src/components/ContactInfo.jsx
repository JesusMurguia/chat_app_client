import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const UserInfo = ({ username, status }) => {
  return (
    <div className={`profile-info ${status}`}>
      <div className="user-icon-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-info-icon " />
      </div>
      <div className="user-info">
        <div className="user-info-name">{username}</div>
        <div className="user-info-subtitle">{status}</div>
      </div>
    </div>
  );
};
