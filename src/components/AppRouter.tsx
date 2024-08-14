import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextType';
import { Button } from './atoms/Button';
import Home from './Home';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

const AppRouter = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
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
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
