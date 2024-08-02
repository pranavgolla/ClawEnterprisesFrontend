import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
            setUser(response.data.user);
        } catch (err) {
            console.error(err);
        }
    };

    const register = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email, password });
            setUser(response.data.user);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
