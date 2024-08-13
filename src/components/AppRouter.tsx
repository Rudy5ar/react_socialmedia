import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm"
import LoginForm from './LoginForm';
import Home from './Home';
import { useAuth } from "../contexts/AuthContextType";

const AppRouter = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
            {!isLoggedIn && (
                <><div>
                <Link to="/login">Login</Link>
                </div>
                <div>
                <Link to="/register">Register</Link></div>
                </>
            )}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterForm/>} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
