import { nanoid } from "@reduxjs/toolkit";
import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";

function CreateRoom() {
  const userRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const room = nanoid();
      const user = userRef.current.value;
      const password = passwordRef.current.value;

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
      <h1>Create new chat</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required />
        <button>Sign In</button>
      </form>
    </section>
  );
}

export default CreateRoom;
