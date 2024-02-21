import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import {Link} from "react-router-dom";

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
        <a className="dropdown-item" onClick={handelLogout}>
           Logout
        </a>
    );
}