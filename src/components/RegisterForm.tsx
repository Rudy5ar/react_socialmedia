import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                email,
                password
            });
            setMessage('Registration successful!');
            console.log('Registration Successful:', response.data);
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
