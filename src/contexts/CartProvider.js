import { createContext, useEffect, useContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { makeDispatchWrapper } from './makeDispatchWrapper';

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

    const dispatchWrapper = makeDispatchWrapper(state, dispatch);

    useEffect(() => {
        dispatchWrapper({ type: 'GET_PRODUCTS' });
        dispatchWrapper({ type: 'GET_WISHLIST' });
        dispatchWrapper({ type: 'GET_CART' });
        //TODO React Hook useEffect has a missing dependency: 'disaptchWrapper'.
        //TODO Either include it or remove the dependency array  react-hooks/exhaustive-deps
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <CartContext.Provider value={{ state, dispatch, dispatchWrapper }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
