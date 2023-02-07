import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import ChatRoom from "./features/chatroom/ChatRoom";
import { selectCurrentRoom } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import Conversation from "./features/chatroom/Conversation";

function App() {
  const room = useSelector(selectCurrentRoom);
  return (
    <Routes>
      <Route Path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Login />} />

        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="room">
            <Route path=":idroom" element={<ChatRoom />}>
              <Route path="user">
                <Route path=":username" element={<Conversation />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
