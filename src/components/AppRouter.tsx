import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextType';
import { Button } from './atoms/Button';
import Home from './Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import UserDetails from './pages/UserDetails';
import PostDetails from './pages/PostDetails';
import Footer from './parts/Footer';

const AppRouter: React.FC = () => {
    const { isLoggedIn, username } = useAuth();

    return (
    <>
    <Router>
            <div>
                {!isLoggedIn && (
                    <>
                        <div>
                            <Button to="/login" color="lightblue">
                                Login
                            </Button>
                        </div>
                        <div>
                            <Button to="/register" color="lightblue">
                                Register
                            </Button>
                        </div>
                    </>
                )}
                <Routes>
                    <Route path="/home" element={<Home username={username || ''} />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/user/:username" element={<UserDetails />} />
                    <Route path="/post/:postId" element={<PostDetails />} />
                </Routes>
            </div>
            <Footer user={username}/>
        </Router>
        
    </>
        
    );
};

export default AppRouter;
