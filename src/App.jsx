import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import ChatRoom from "./features/chatroom/ChatRoom";

function App() {
  return (
    <Routes>
      <Route Path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Login />} />

        {/* Protected */}
        <Route element={<RequireAuth />}>
          <Route path="room" element={<ChatRoom />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
