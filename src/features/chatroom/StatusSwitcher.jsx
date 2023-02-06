import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateStatus } from "../auth/authSlice";

function StatusSwitcher() {
  const { status } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleStatusChange = (e) => {
    dispatch(updateStatus({ status: e.target.value }));
  };

  return (
    <div>
      <label htmlFor="status-selector">Status:</label>
      <select
        id="status-selector"
        name="status-selector"
        onChange={handleStatusChange}
        value={status}
      >
        <option value="ONLINE">ONLINE</option>
        <option value="OFFLINE">OFFLINE</option>
        <option value="AWAY">AWAY</option>
      </select>
    </div>
  );
}

export default StatusSwitcher;
