import { useAuth } from "../../provider/authProvider";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Cart() {
    const {profileUserName} = useAuth();

    useEffect(() => {
        const userName = profileUserName;

        axios.get('https://localhost:7277/Cart', {params: {userName}})
            .then(response => {
                //show data
                console.log(response.data);
                
            })
            .catch(error => {
                console.error(error.response);
            });
        
    }, []);

    return (
        <h1>Hola mundo 2</h1>
    );
}