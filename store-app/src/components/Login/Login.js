import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import PropTypes from "prop-types";

const Login = ({setToken, location}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // fetch("https://localhost:7277/User/Login",
            // {
            //     method: "POST",
            //     body: JSON.stringify({
            //         userName,
            //         password
            //     }),
            //     headers: {
            //         "Content-type": "application/json; charser=UTF-8"
            //     }
            // }).then(response => {
            //     console.log(response.data);
            // })
            axios.post('https://localhost:7277/User/Login', { userName, password })
                .then((response) => {
                    console.log(response.data);
                    setToken(response.data);
                    navigate(location || "/");
                });
        } catch(error) {
            console.log(error);
        }
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login