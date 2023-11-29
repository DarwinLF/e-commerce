import React from "react";
import Login from "../Login/Login";
import useToken from "../../hooks/useToken";
import {useLocation} from "react-router-dom";

export default function Cart() {
    const {token, setToken} = useToken();
    const location = useLocation();

    if(!token) {
        {return <Login setToken={setToken} fromPath={location}/>}
    }

    return (
        <h1>Hola mundo 2</h1>
    );
}