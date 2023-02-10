import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../auth/authApiSlice";
import Swal from "sweetalert2";

export const Register = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const navigate = useNavigate();
  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = userRef.current.value;
      const password = passwordRef.current.value;
      const userData = await register({ user, password }).unwrap();
      e.target.reset();
      Swal.fire("Success!", "User created succesfully.", "success").then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire("Error!", "User already exists.", "error").then(() => {
        navigate("/");
      });
    }
  };
  return (
    <section id="register">
      <h1>Create a new account</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="username2">Username:</label>
        <input
          type="text"
          id="username2"
          ref={userRef}
          autoComplete="off"
          required
        />

        <label htmlFor="password12">Password:</label>
        <input type="password" id="password2" ref={passwordRef} required />

        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};
