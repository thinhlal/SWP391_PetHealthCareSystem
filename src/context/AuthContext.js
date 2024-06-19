// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const logIn = userData => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
        setUser(null);
    };

    if (loading) {
        return; 
    }

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
