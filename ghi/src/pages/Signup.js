import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";
import { useAuthContext } from "./Authentication.js";
import "../styles/Signup.css";

function Signup() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signup = useToken()[3];
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(
      first_name,
      last_name,
      email,
      username,
      password
    );
    if (response) {
      navigate("/homepage");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
            <h1 className="sign-up">Become an Movie Zone Member! Sign up!</h1>
          </div>
          <form onSubmit={handleSubmit} id="create-user">
            <div class="user-box">
              <input
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                value={first_name}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div class="user-box">
              <input
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                value={last_name}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div class="user-box">
              <input
                onChange={handleEmailChange}
                placeholder="your@email.com"
                required
                type="text"
                name="email"
                value={email}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div class="user-box">
              <input
                onChange={handleUsernameChange}
                placeholder="username"
                required
                type="text"
                name="username"
                value={username}
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="password">
              <input
                onChange={handlePasswordChange}
                placeholder="********"
                required
                type="text"
                name="password"
                className="form-control"
                value={password}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <button className="link-btn" onClick={() => navigate("/login")}>
          Already a Movie Zone Member? Sign in!
        </button>
      </div>
    </div>
  );
}

export default Signup;