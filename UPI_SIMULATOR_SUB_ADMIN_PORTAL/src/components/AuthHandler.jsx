import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthHandler = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            window.history.replaceState({}, document.title, "/");
        }

        const savedToken = localStorage.getItem('token');
        if (!savedToken) {
            // Redirect to User App Login
            window.location.href = 'http://localhost:5173/login';
        }
    }, [location, navigate]);

    return <>{children}</>;
};

export default AuthHandler;
