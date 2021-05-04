import axios from 'axios';
import { createContext, useContext, useState } from 'react';

export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
    async function loginUserWithEmailAndPassword(email, password) {
        const res = await axios.post('http://localhost:3999/auth/login', {
            emailId: email,
            password: password,
        });

        console.log(res);

        if (res.data.success === true) {
            console.log('logged in...');
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

    const [state, setState] = useState({
        username: null,
        userId: null,
        emailId: null,
        firstName: null,
        lastName: null,
        cartId: null,
        wishListId: null,
    });
    return (
        <AuthenticationContext.Provider
            value={{ state, setState, loginUserWithEmailAndPassword }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}
