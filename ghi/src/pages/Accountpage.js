import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Authentication";
import "../styles/Accountpage.css";

function AccountDetailView() {
    const { accoumt, token } = useAuthContext();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        } else {
            const fetchUserData = async () => {
                const url = `${process.env.REACT_APP_MOVIES_SERVICE_API_HOST}/users/get/${token.account.id}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            };
            fetchUserData();
        }
    }, [accoumt, token, navigate]);
    console.log(token)
    console.log(userData)
    return (
        <div>
            <h2 className="account-detail">Account Details</h2>
            <div className="text-center">
                <p>First Name: {userData.first_name}</p>
                <p>Last Name: {userData.last_name}</p>
                <p>Email: {userData.email}</p>
                <p>Username: {userData.username}</p>
            </div>
            <button
                className="link-btn"
                type="submit"
                onClick={() => navigate("/AccountDetails/edit")}
            >
                Edit Account Information
            </button>
        </div>
    );
}

export default AccountDetailView;
