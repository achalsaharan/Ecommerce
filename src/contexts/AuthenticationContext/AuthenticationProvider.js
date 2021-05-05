import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';

const API = 'https://afternoon-scrubland-43673.herokuapp.com';

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
    });

    const navigate = useNavigate();

    async function loginUserWithEmailAndPassword(email, password) {
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
            });

            return true;
        } else {
            return false;
        }
    }

    async function logoutUser(userId) {
        setState({
            userId: null,
            emailId: null,
            firstName: null,
            lastName: null,
            cartId: null,
            wishListId: null,
        });

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
