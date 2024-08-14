import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextType';
import '../css/LoginForm.css'

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);
    const {setIsLoggedIn} = useAuth();


    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            console.log('Login Successful:', response.data);
            localStorage.setItem('jwtToken', response.data.token);
            setIsLoggedIn(true);
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Login failed. Please try again.');
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
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {message && <p>{message}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
