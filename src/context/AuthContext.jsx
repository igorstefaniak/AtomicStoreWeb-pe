import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authHeader = {
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
    };

    const login = (userData, role) => {
        setLoggedIn(true);
        setUsername(userData.username);
        setPassword(userData.password);
        setIsAdmin(role === "ADMIN");
    };

    const logout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
        setUsername('');
        setPassword('');
    };

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                isAdmin,
                username,
                password,
                authHeader,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
