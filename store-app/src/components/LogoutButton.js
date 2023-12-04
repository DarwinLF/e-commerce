import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export default function LogoutButton() {
    const {setToken, setProfileUserName, setUserRole} = useAuth();
    const navigate = useNavigate();

    const handelLogout = () => {
        setToken(null);
        setProfileUserName(null);
        setUserRole(null);
        navigate("/");
    };

    return (
        <button className="mr-4" onClick={handelLogout}>
           | Logout
        </button>
    );
}