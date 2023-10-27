import React, { useState } from "react";
import { useLoginMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Login.css"

function Login() {
    const [login, loginResponse] = useLoginMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      if (loginResponse.isSuccess) navigate(`${"allwatchlist"}`);
      if (loginResponse.isError) {
        setErrorMessage(loginResponse.error.data.detail);
      }
    }, [loginResponse]);

    const handleSubmit = (e) => {
      e.preventDefault();
      login({ username, password });
    };

        return (
          <div class="login-box">
            <h1>Welcome to Movie Zone! Log In</h1>
            <h2>Login</h2>
            {errorMessage && (
              <div className="alert alert-danger" role="alert"></div>
            )}
            <form onSubmit={handleSubmit} id="user-login">
              <div class="user-box">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                  type="text"
                  name="username"
                  value={username}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div class="user-box">
                <input
                  onChange={handlePasswordChange}
                  placeholder="******"
                  required
                  type="text"
                  name="password"
                  value={password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <button
                className="btn btn=primary"
                onClick={() => navigate("/signup")}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;
