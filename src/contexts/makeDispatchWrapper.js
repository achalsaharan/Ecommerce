import axios from 'axios';
import { isPresentInArray } from './arrayUtils';

export function makeDispatchWrapper(state, dispatch) {
	async function dispatchWrapper(action) {
		switch (action.type) {
			case 'GET_PRODUCTS': {
				const res = await axios.get('/api/products');

				if (res.status === 200) {
					dispatch({
						type: 'SET_PRODUCTS',
						payload: res.data.products,
					});
				}

				break;
			}

			case 'GET_WISHLIST': {
				const res = await axios.get('/api/wishListItems');

				if (res.status === 200) {
					dispatch({
						type: 'SET_WISHLIST',
						payload: res.data.wishListItems,
					});
				}
				break;
			}

			case 'GET_CART': {
				const res = await axios.get('/api/cartItems');

				if (res.status === 200) {
					dispatch({
						type: 'SET_CART',
						payload: res.data.cartItems,
					});
				}

				break;
			}

			case 'ADD_TO_WISHLIST': {
				//xx this check fails when we add an item two times very quickly
				if (isPresentInArray(state.wishListItems, action.payload)) {
					alert('already present in arr');
					break;
				}

				const obj = { ...action.payload };
				delete obj.quantity;
				const res = await axios.post('/api/wishListItems', {
					wishListItem: obj,
				});

				if (res.status === 201) {
					dispatch({ type: 'ADD_TO_WISHLIST', payload: obj });
				}

				break;
			}

			case 'ADD_TO_CART': {
				//xx this check fails when we add an item two times very quickly
				if (isPresentInArray(state.cartItems, action.payload)) {
					alert('already present in cart');
					break;
				}

				const res = await axios.post('/api/cartItems', {
					cartItem: { ...action.payload, quantity: 1 },
				});

				if (res.status === 201) {
					dispatch({
						type: 'ADD_TO_CART',
						payload: action.payload,
					});
				}

				break;
			}

			default:
				console.log('err in disaptch wrapper');
				break;
		}
	}

	return dispatchWrapper;
}
