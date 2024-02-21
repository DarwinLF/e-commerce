import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setToken, setProfileUserName, setUserRole} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        axios.post('https://localhost:7277/User/Login', { userName, password })
            .then((response) => {
                setToken(response.data.message);
                setProfileUserName(userName);
                setUserRole(response.data.role);
                navigate("/");
            })
            .catch((error) => {
                //add toast
                alert(error.response.data);
            });
    }

    return(
        <div className="container mt-5 py-4 px-xl-5">
            <div className='card-wrapper'>
                <div className='card-inner'>
                    <form onSubmit={handleLogin}>
                        <h3>Log In</h3>

                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {/* <div className="mb-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        {/* <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login