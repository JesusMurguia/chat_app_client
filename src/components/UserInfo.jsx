import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";

export const UserInfo = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="profile-info">
      <FontAwesomeIcon icon={faUser} className="profile-info-icon" />
      <div className="user-info">
        <div className="user-info-name">{user.username}</div>
        <div className="user-info-subtitle">My Account</div>
      </div>
      <button className="user-info-button">
        <FontAwesomeIcon icon={faEllipsisV} className="user-info-button-icon" />
      </button>
    </div>
  );
};
