// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

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

    const logOut = async () => {
        try {
            let deviceIdentifier = localStorage.getItem('deviceIdentifier');
            await axiosInstance.post(
                `${process.env.REACT_APP_API_URL}/logout`,
                {deviceIdentifier},
                {
                    withCredentials: true,
                });
        } catch (error) {
            console.error('Failed to log out:', error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        }
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
