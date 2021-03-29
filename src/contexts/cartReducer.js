export function cartReducer(state, action) {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};

		case 'ADD_TO_CART':
			return {
				...state,
				cartItems: [
					...state.cartItems,
					{ ...action.payload, quantity: 1 },
				],
			};

		case 'ADD_TO_WISHLIST':
			//removing the quantity key from the payload
			const objToAdd = { ...action.payload };
			delete objToAdd.quantity;
			return {
				...state,
				wishListItems: [...state.wishListItems, objToAdd],
			};

		default:
			console.log('error in CART REDUCER');
			break;
	}
}
