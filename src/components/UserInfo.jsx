import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";
import StatusSwitcher from "../features/chatroom/StatusSwitcher";
import { useState } from "react";

export const UserInfo = () => {
  const user = useSelector(selectCurrentUser);
  const [visible, setVisible] = useState(false);

  const handleStatusSwitcher = () => {
    setVisible(!visible);
  };

  return (
    <div className={`profile-info ${user.status}`}>
      <div className="user-icon-wrapper">
        <FontAwesomeIcon icon={faUser} className="profile-info-icon " />
      </div>
      <div className="user-info">
        <div className="user-info-name">{user.username}</div>
        <div className="user-info-subtitle">{user.status}</div>
      </div>

      <button className="user-info-button" onClick={handleStatusSwitcher}>
        <FontAwesomeIcon icon={faEllipsisV} className="user-info-button-icon" />
      </button>
      {visible ? <StatusSwitcher setVisible={setVisible} /> : <></>}
    </div>
  );
};
