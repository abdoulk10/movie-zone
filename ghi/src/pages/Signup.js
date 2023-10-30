import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";
import { useAuthContext } from "./Authentication";
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
      navigate("/homepage");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="text-center">
            <h1 className="sign-up" style={{ fontSize: '25px' }}>Become a Movie Zone Member! Sign up!</h1>
          </div>
          <form onSubmit={handleSubmit} id="create-user">
            <div className="form-floating mb-3">
              <label htmlFor="first_name">First Name:</label>
              <label htmlFor="blank" style={{ color: 'rgba(255, 255, 255, 0)'}}>..__</label>
              <input
                onChange={handleFirstNameChange}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                className="form-control"
                value={first_name}
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="last_name">Last Name:</label>
              <label htmlFor="blank" style={{ color: 'rgba(255, 255, 255, 0)'}}>___</label>
              <input
                onChange={handleLastNameChange}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                className="form-control"
                value={last_name}
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="email">Email:</label>
              <label htmlFor="blank" style={{ color: 'rgba(255, 255, 255, 0)'}}>w._____</label>
              <input
                onChange={handleEmailChange}
                placeholder="your@email.com"
                required
                type="text"
                name="email"
                className="form-control"
                value={email}
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="username">Username:</label>
              <label htmlFor="blank" style={{ color: 'rgba(255, 255, 255, 0)'}}>...__</label>
              <input
                onChange={handleUsernameChange}
                placeholder="username"
                required
                type="text"
                name="username"
                className="form-control"
                value={username}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password:</label>
              <label htmlFor="blank" style={{ color: 'rgba(255, 255, 255, 0)'}}>____</label>
              <input
                onChange={handlePasswordChange}
                placeholder="********"
                required
                type="password"
                name="password"
                className="form-control"
                value={password}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </form>
          <button className="link-btn" onClick={() => navigate("/login")}>
              Already a Movie Zone Member? Sign in!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
