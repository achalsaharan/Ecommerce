import { createContext, useEffect, useContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { makeDispatchWrapper } from './makeDispatchWrapper';
import { useAuthentication } from '../AuthenticationContext/AuthenticationProvider';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cartItems: [],
        wishListItems: [],
        sortBy: 'NONE',
        showOutOfStock: true,
        showFastDeliveryOnly: false,
        searchProduct: '',
    });

    const {
        state: { userId, cartId, wishListId },
    } = useAuthentication();

    const dispatchWrapper = makeDispatchWrapper(
        state,
        dispatch,
        userId,
        cartId,
        wishListId
    );

    useEffect(() => {
        dispatchWrapper({ type: 'GET_PRODUCTS' });

        //TODO React Hook useEffect has a missing dependency: 'disaptchWrapper'.
        //TODO Either include it or remove the dependency array  react-hooks/exhaustive-deps
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (cartId) {
            dispatchWrapper({ type: 'GET_CART' });
        } else {
            dispatch({ type: 'SET_CART', payload: [] });
        }
    }, [cartId]); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (wishListId) {
            dispatchWrapper({ type: 'GET_WISHLIST' });
        } else {
            dispatch({ type: 'SET_WISHLIST', payload: [] });
        }
    }, [wishListId]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <CartContext.Provider value={{ state, dispatch, dispatchWrapper }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
