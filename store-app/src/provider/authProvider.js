import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //state to hold the authentication token
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [profileUserName, setProfileUserName] = useState(localStorage.getItem("userName"));
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    useEffect(() => {
        if(token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            if(decodedToken && decodedToken.exp > Date.now() / 1000 && decodedToken.exp < Date.now() / 1000 + 3 * 60 * 60) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                localStorage.setItem("token", token);
                localStorage.setItem("userName", profileUserName);
                localStorage.setItem("userRole", userRole);
            } else {
                setToken(null);
                setProfileUserName(null);
                setUserRole(null);
            }
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            localStorage.removeItem("userRole");
        }
    }, [token, profileUserName, userRole]);

    //Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            profileUserName,
            setProfileUserName,
            userRole,
            setUserRole,
        }),
        [token, profileUserName, userRole]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;