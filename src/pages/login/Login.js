import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../contexts';
import { useState } from 'react';

export function Login() {
    const { loginUserWithEmailAndPassword } = useAuthentication();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginBtnClick() {
        const response = await loginUserWithEmailAndPassword(email, password);

        if (response === true) {
            navigate('/products');
        }
    }

    return (
        <div className="login-container shadow-box">
            <h3>LOGIN</h3>

            <input
                className="form-input"
                type="text"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="btn btn-primary submit-form"
                onClick={handleLoginBtnClick}
            >
                Login
            </button>
            <div className="form-bottom">
                <Link to="/">Don't Have An Account? Sign Up</Link>
            </div>
        </div>
    );
}
