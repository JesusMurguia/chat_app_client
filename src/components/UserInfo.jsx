import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";
import StatusSwitcher from "../features/chatroom/StatusSwitcher";
import useComponentVisible from "./useComponentVisible";

export const UserInfo = () => {
  const user = useSelector(selectCurrentUser);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleStatusSwitcher = () => {
    setIsComponentVisible(true);
  };

  return (
    <div className={`profile-info ${user.status}`}>
      <div className="user-icon-wrapper status">
        <FontAwesomeIcon icon={faUser} className="profile-info-icon " />
      </div>
      <div className="user-info">
        <div className="user-info-name">{user.username}</div>
        <div className="user-info-subtitle">{user.status}</div>
      </div>

      <button className="user-info-button" onClick={handleStatusSwitcher}>
        <FontAwesomeIcon icon={faEllipsisV} className="user-info-button-icon" />
      </button>
      {isComponentVisible ? (
        <StatusSwitcher
          switcherRef={ref}
          setVisible={() => setIsComponentVisible(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
