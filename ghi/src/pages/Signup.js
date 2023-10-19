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
            navigate("/login");
        } else {
            isLoggedIn(false);
            navigate("/");
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <div className="text-center">
                        <h1 className="sign-up">Become an IMDme Member! Sign up!</h1>
                    </div>
                    <form onSubmit={handleSubmit} id="create-user">
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFirstNameChange}
                            placeholder="First Name"
                            required
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={first_name}
                        />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleLastNameChange}
                            placeholder="Last Name"
                            required
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={last_name}
                        />
                            <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleEmailChange}
                            placeholder="your@email.com"
                            required
                            type="text"
                            name="email"
                            className="form-control"
                            value={email}
                        />
                            <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleUsernameChange}
                            placeholder="username"
                            required
                            type="text"
                            name="username"
                            className="form-control"
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
