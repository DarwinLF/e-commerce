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

    return(
        <form onSubmit={handleLogin}>
            <div className='flex flex-col justify-center items-center'>
                <input
                    className='inputBox'
                    type='text'
                    placeholder='Username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    className='inputBox'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button' type="submit">Login</button>
                <a href='/Signup'>New user? Sign up</a>
            </div>
            
        </form>
    );
}

export default Login