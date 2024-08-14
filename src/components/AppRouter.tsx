import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from "./RegisterForm"
import LoginForm from './pages/LoginForm';
import Home from './Home';
import { useAuth } from "../contexts/AuthContextType";
import { Button } from './atoms/Button';

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
