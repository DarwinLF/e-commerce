import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Signup() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('/api/register', { username, password });
            // Handle successful registration
            console.log(response.data);
            navigate("/home");
        } catch (error) {
            console.error(error);
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