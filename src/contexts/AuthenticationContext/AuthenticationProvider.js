import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../constants';

export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
    const [state, setState] = useState({
        username: null,
        userId: null,
        emailId: null,
        firstName: null,
        lastName: null,
        cartId: null,
        wishListId: null,
        token: null,
    });

    const navigate = useNavigate();

    function setupAuthHeaderForServiceCalls(token) {
        if (token) {
            return (axios.defaults.headers.common['Authorization'] = token);
        }
        delete axios.defaults.headers.common['Authorization'];
    }

    function setupAuthExceptionHandler(logoutUser, navigate) {
        const UNAUTHORIZED = 401;
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error?.response?.status === UNAUTHORIZED) {
                    logoutUser();
                    navigate('login');
                }
                return Promise.reject(error);
            }
        );
    }

    useEffect(() => {
        const user = JSON.parse(localStorage?.getItem('user'));

        if (user) {
            setState({
                userId: user._id,
                emailId: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                cartId: user.cart,
                wishListId: user.wishList,
                token: user.token,
            });

            setupAuthHeaderForServiceCalls(user.token);
        }
        setupAuthExceptionHandler(logoutUser, navigate);
    }, []);

    async function loginUserWithEmailAndPassword(email, password) {
        try {
            const res = await axios.post(`${API}/auth/login`, {
                emailId: email,
                password: password,
            });

            console.log(res);

            if (res.data.success === true) {
                console.log('logging in...');
                setState({
                    userId: res.data.user._id,
                    emailId: res.data.user.email,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    cartId: res.data.user.cart,
                    wishListId: res.data.user.wishList,
                    token: res.data.token,
                });

                setupAuthHeaderForServiceCalls(res.data.token);

                //saving user details and token in localstorage
                const token = res.data.token;
                const user = { ...res.data.user, token };

                localStorage?.setItem('user', JSON.stringify(user));

                return true;
            }
        } catch (error) {
            return false;
        }
    }

    async function logoutUser() {
        setState({
            userId: null,
            emailId: null,
            firstName: null,
            lastName: null,
            cartId: null,
            wishListId: null,
            token: null,
        });

        localStorage?.clear();

        setupAuthHeaderForServiceCalls();

        navigate('/products');
    }

    async function createUser(firstName, lastName, email, password) {
        try {
            const user = await axios.post(`${API}/users`, {
                firstName,
                lastName,
                email,
                password,
            });

            if (user.data.success === true) {
                return true;
            } else {
                toast.error('email already registered');
                return false;
            }
        } catch (error) {
            console.log('error creating user', error);
            return false;
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{
                state,
                setState,
                loginUserWithEmailAndPassword,
                logoutUser,
                createUser,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}
