import { Outlet } from "react-router-dom";
import { selectCurrentRoom } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Layout = () => {
  const roomid = useSelector(selectCurrentRoom);
  return (
    <main>
      <p>{roomid ? "Room ID: " + roomid : ""}</p>
      <Outlet />
    </main>
  );
};

export default Layout;
