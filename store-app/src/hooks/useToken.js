import React, {useState} from "react";

const useToken = () => {
    const getToken = () => {
        const token = localStorage.getItem("token");
        return token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem("token", useToken);
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;