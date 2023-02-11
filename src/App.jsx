import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import ChatRoom from "./features/chatroom/ChatRoom";
import { selectCurrentRoom } from "./features/auth/authSlice";
import { useSelector } from "react-redux";
import { Conversation } from "./components/Conversation";
import JoinRoom from "./features/chatroom/JoinRoom";
import CreateRoom from "./features/chatroom/CreateRoom";
import Welcome from "./components/Welcome";
import "./css/app.css";
import "./css/reset.css";
import { Register } from "./features/auth/Register";

function App() {
  const room = useSelector(selectCurrentRoom);
  return (
    <Routes>
      <Route Path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Welcome />} />
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="join-room" element={<JoinRoom />} />
        <Route path="register" element={<Register />} />

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
