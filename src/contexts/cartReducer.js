import { isPresentInArray } from './arrayUtils';

export function cartReducer(state, action) {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};

		case 'SET_WISHLIST':
			return {
				...state,
				wishListItems: action.payload,
			};

		case 'SET_CART':
			return {
				...state,
				cartItems: action.payload,
			};

		case 'ADD_TO_CART':
			if (isPresentInArray(state.cartItems, action.payload)) {
				alert('already present in cart but missed by dispatch wrapper');
				return state;
			}
			return {
				...state,
				cartItems: [
					...state.cartItems,
					{ ...action.payload, quantity: 1 },
				],
			};

		case 'ADD_TO_WISHLIST':
			if (isPresentInArray(state.wishListItems, action.payload)) {
				alert(
					'already present in wishlist but missed by dispatch wrapper'
				);
				return state;
			}

			return {
				...state,
				wishListItems: [...state.wishListItems, action.payload],
			};

		default:
			console.log('error in CART REDUCER');
			break;
	}
}
