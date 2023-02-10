import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateStatus } from "../auth/authSlice";
import { startConnecting } from "./chatSlice";

function StatusSwitcher({ setVisible, switcherRef }) {
  const { status } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const data = ["ONLINE", "OFFLINE", "AWAY"];
  const handleStatusChange = (item) => {
    if (item === "ONLINE") {
      dispatch(startConnecting());
    }
    setVisible(false);
    dispatch(updateStatus({ status: item }));
  };

  return (
    <div className="status-switcher" ref={switcherRef}>
      {data.map((item) => {
        return (
          <div
            className={`status-item ${status === item ? "selected" : ""}`}
            key={item}
            onClick={() => handleStatusChange(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default StatusSwitcher;
