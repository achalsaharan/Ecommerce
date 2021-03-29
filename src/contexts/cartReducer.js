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

		case 'REMOVE_FROM_WISHLIST':
			return {
				...state,
				wishListItems: state.wishListItems.filter(
					(item) => item.productId !== action.payload.productId
				),
			};

		case 'REMOVE_FROM_CART':
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item.productId !== action.payload.productId
				),
			};

		case 'INCREASE_CART_ITEM_QUANTITY': {
			return {
				...state,
				cartItems: state.cartItems.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				),
			};
		}

		case 'DECREASE_CART_ITEM_QUANTITY': {
			return {
				...state,
				cartItems: state.cartItems.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				),
			};
		}

		default:
			console.log('error in CART REDUCER');
			break;
	}
}
