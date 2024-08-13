import { useNavigate } from 'react-router-dom';
import '../css/LoginRegisterButtons.css'

const LoginRegisterButtons = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/login')}>Go to Login</button>
            <button onClick={() => navigate('/register')}>Go to Register</button>
        </div>
    );
}

export default LoginRegisterButtons