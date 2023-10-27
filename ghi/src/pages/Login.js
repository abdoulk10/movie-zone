import React, { useState } from "react";
import { useToken, useAuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom"
import "../styles/Login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useToken()[1];
    const { isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

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

        const error = await login(username, password);
        if (error) {
            isLoggedIn(false);
        } else {
            navigate("/homepage");
        }
        await login(username, password);
        };

        return (
          <div class="login-box">
            <h1>Welcome to Movie Zone! Sign In</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} id="user-login">
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
