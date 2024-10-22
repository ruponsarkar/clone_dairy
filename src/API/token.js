import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_details = JSON.parse(userString);
        return user_details;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {

        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        window.location.href = "/#/admin/dashboard";

    }

    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/#/login";

    }

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        logout


    }

}