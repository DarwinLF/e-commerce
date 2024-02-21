import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';

export default function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setToken, setProfileUserName, setUserRole} = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        axios.post('https://localhost:7277/User/Signup', { userName, password })
            .then((response) => {
                console.log(response.data);
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

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <div className='card-wrapper'>
                <div className='card-inner'>
                    <form onSubmit={handleSignup}>
                        <h3>Sign Up</h3>

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
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered <a href="/Login">log in?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}