import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../contexts';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function SignUp() {
    const { loginUserWithEmailAndPassword, createUser } = useAuthentication();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function validateFirstName(firstName) {
        if (firstName.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    function validateEmail(email) {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function validatePassword(password) {
        if (password.length >= 6) {
            return true;
        } else {
            return false;
        }
    }

    async function signUpAndLogin() {
        setLoading(true);

        const isFirstNameValid = validateFirstName(firstName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid || !isFirstNameValid) {
            setFirstNameError(!isFirstNameValid);
            setEmailError(!isEmailValid);
            setPasswordError(!isPasswordValid);
            setLoading(false);
            return;
        }

        setFirstNameError(false);
        setEmailError(false);
        setPasswordError(false);

        try {
            const newUser = await createUser(
                firstName,
                lastName,
                email,
                password
            );

            //login user
            if (newUser === true) {
                const response = await loginUserWithEmailAndPassword(
                    email,
                    password
                );
                setLoading('false');
                if (response === true) {
                    navigate('/products');
                }
            } else {
                setLoading(false);
                console.log('error creating user');
            }
        } catch (error) {
            setLoading(false);
            console.log('error signing up');
            toast.error('error signing up');
        }
    }

    return (
        <div className="login-container shadow-box">
            {loading ? (
                <div className="loading-modal">
                    <div className="loader"></div>
                </div>
            ) : null}

            <h3>SIGN UP</h3>
            <input
                className="form-input"
                type="text"
                placeholder="Enter first name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameError ? (
                <div className="form-field-validation-error">
                    <i class="fas fa-info-circle"></i>
                    <span>First name is required</span>
                </div>
            ) : null}

            <input
                className="form-input"
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                className="form-input"
                type="text"
                placeholder="Enter your email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? (
                <div className="form-field-validation-error">
                    <i class="fas fa-info-circle"></i>
                    <span>Enter a valid email id</span>
                </div>
            ) : null}

            <input
                className="form-input"
                type="password"
                placeholder="Enter your password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ? (
                <div className="form-field-validation-error">
                    <i class="fas fa-info-circle"></i>
                    <span>Password must be 6 characters or longer</span>
                </div>
            ) : null}

            {/* <input
                className="form-input"
                type="password"
                placeholder="confirm password"
            /> */}
            <button
                className="btn btn-primary submit-form"
                onClick={signUpAndLogin}
            >
                Sign Up
            </button>
            <div className="form-bottom">
                <Link to="/">Already have an account? Login In.</Link>
            </div>
        </div>
    );
}
