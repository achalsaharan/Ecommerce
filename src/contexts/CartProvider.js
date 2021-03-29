import { createContext, useEffect, useContext, useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { makeDispatchWrapper } from './makeDispatchWrapper';

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, {
		products: [],
		cartItems: [],
		wishListItems: [],
	});

	const dispatchWrapper = makeDispatchWrapper(dispatch);

	useEffect(() => {
		dispatchWrapper({ type: 'GET_PRODUCTS' });
	}, []);

	return (
		<CartContext.Provider value={{ state, dispatch, dispatchWrapper }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}
