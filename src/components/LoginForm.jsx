import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/public/user/login', {
                params: { username, password },
            });

            if (response.data.status === 'success') {
                const user = response.data.user;
                login({ username, password }, user.role);
            } else {
                alert('Nieprawidłowa nazwa użytkownika lub hasło.');
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            alert('Nieprawidłowa nazwa użytkownika lub hasło.');
        }
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <input
                type="text"
                placeholder="Nazwa użytkownika"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Zaloguj się</button>
        </div>
    );
};

export default LoginForm;
