import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useHistory} from "react-router-dom";

export default function LogoutButton() {
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const handelLogout = () => {
        setToken(null);
        navigate("/");
    };

    return (
        <button className="mr-4" onClick={handelLogout}>
            Logout
        </button>
    );
}