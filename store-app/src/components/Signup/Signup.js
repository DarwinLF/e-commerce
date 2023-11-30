import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';

export default function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setToken} = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            axios.post('https://localhost:7277/User/Signup', { userName, password })
                .then((response) => {
                    console.log(response.data);
                    setToken(response.data);
                    navigate("/");
                });
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSignup}>
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
            <button className='button' type="submit">Sign up</button>
        </form>
    );
}