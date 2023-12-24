import React, { useState } from 'react';
import useAuth from '../../Model/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register, login } = useAuth();

    const handleRegister = async (event) => {
        event.preventDefault();
        const { data, status } = await register(regUsername, regPassword);
        if (status) {
            console.log('Registration successful:', data);
        } else {
            console.error('Registration failed:', data.error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { data, error, status } = await login(username, password);
        if (status) {
            navigate('/quiz');
        } else {
            alert('Login failed: ' + error);
        }
    };
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <p>or...</p>

            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="regUsername">Username:</label>
                    <input
                        type="text"
                        id="regUsername"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="regPassword">Password:</label>
                    <input
                        type="password"
                        id="regPassword"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
