import React from "react";
import { useHistory} from "react-router-dom";

export default function LogoutButton() {
    const history = useHistory();

    const handelLogout = () => {
        localStorage.removeItem("token");
        //Clear any other user-specific data
        history.push("/login");
    };

    return (
        <button onClick={handelLogout}>
            Logout
        </button>
    );
}