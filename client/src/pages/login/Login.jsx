import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="password..."
          ref={passwordRef}
        />
        <div className="loginButtons">
          <button className="loginButton" type="submit" disabled ={isFetching}>
            Login
          </button>
          <Link className="link" to={"/register"}>
            <div className="registerButtons">
              <button className="loginRegisterButton">Register</button>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
