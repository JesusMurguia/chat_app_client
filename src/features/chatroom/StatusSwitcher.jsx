import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateStatus } from "../auth/authSlice";

function StatusSwitcher({ setVisible }) {
  const { status } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const data = ["ONLINE", "OFFLINE", "AWAY"];
  const handleStatusChange = (item) => {
    setVisible(false);
    dispatch(updateStatus({ status: item }));
  };

  return (
    <div className="status-switcher">
      {data.map((item) => {
        return (
          <div
            className={`status-item ${status === item ? "selected" : ""}`}
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
