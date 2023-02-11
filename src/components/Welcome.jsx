import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <section id="welcome">
      <div className="buttons">
        <button onClick={() => navigate("/create-room")}>Create Room</button>
        <button onClick={() => navigate("/join-room")}>Join Room</button>
      </div>
    </section>
  );
};

export default Welcome;
