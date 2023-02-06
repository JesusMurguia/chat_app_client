import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

function JoinRoom() {
  const userRef = useRef();
  const passwordRef = useRef();
  const chatIdRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const room = chatIdRef.current.value;
      const user = userRef.current.value;
      const password = passwordRef.current.value;
      console.log(room, user, password);
      const userData = await login({ user, password, room }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      e.target.reset();
      navigate("/room");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1>Join existing chat</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="chat-id">Chat ID:</label>
        <input
          type="text"
          id="chat-id"
          ref={chatIdRef}
          autoComplete="on"
          required
        />

        <label htmlFor="username1">Username:</label>
        <input
          type="text"
          id="username1"
          ref={userRef}
          autoComplete="off"
          required
        />

        <label htmlFor="password1">Password:</label>
        <input type="password" id="password1" ref={passwordRef} required />
        <button>Sign In</button>
      </form>
    </section>
  );
}

export default JoinRoom;
