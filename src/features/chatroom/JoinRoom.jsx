import { React, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";

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
      const userData = await login({ user, password, room }).unwrap();
      dispatch(setCredentials({ ...userData }));
      e.target.reset();
      navigate("/room/" + room);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)idroom\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookieValue) {
      chatIdRef.current.value = cookieValue;
    }
  }, []);

  return (
    <section id="join-room">
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
        <button type="submit">Sign In</button>
        <Link to="/">Create an account</Link>
      </form>
    </section>
  );
}

export default JoinRoom;
