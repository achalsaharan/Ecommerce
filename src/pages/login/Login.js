import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../contexts';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function Login() {
    const { loginUserWithEmailAndPassword, state } = useAuthentication();
    const { userId } = state;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            navigate('/products');
        }
    }, [userId]);

    async function loginUser() {
        try {
            setLoading(true);
            const response = await loginUserWithEmailAndPassword(
                email,
                password
            );

            setLoading(false);
            if (response === true) {
                navigate('/products');
            } else {
                toast.error('email or password incorrect, try again');
            }
        } catch (error) {
            setLoading(false);
            console.log('error occoured while logging in', error);
            toast.warning('error while loggin in, try again');
        }
    }

    return (
        <div className="login-container shadow-box">
            {loading ? (
                <div className="loading-modal">
                    <div className="loader"></div>
                </div>
            ) : null}

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
            <button className="btn btn-primary submit-form" onClick={loginUser}>
                Login
            </button>
            <div className="form-bottom">
                <Link to="/signup">Don't Have An Account? Sign Up</Link>
            </div>
        </div>
    );
}
