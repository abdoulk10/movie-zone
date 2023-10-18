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
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <div className="text-center">
                            <h1>Welcome to Movie Zone! Sign In!</h1>
                        </div>
                        <form onSubmit={handleSubmit} id="user-login">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={handleUsernameChange}
                                    placeholder="username"
                                    required
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn=promary" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                    <button className="link-btn" onClick={() => navigate("/signup")}>
                        Not a Member? Click this link to sign up!
                    </button>
                </div>
            </div>
    );
}

export default Login;
