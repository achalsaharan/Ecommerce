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
				delete obj.id;
				const res = await axios.post('/api/wishListItems', {
					wishListItem: obj,
				});

				if (res.status === 201) {
					dispatch({
						type: 'ADD_TO_WISHLIST',
						payload: res.data.wishListItem,
					});
				}

				break;
			}

			case 'ADD_TO_CART': {
				//xx this check fails when we add an item two times very quickly
				// if (isPresentInArray(state.cartItems, action.payload)) {
				// 	alert('already present in cart');
				// 	break;
				// }

				const obj = { ...action.payload };
				delete obj.id;

				const res = await axios.post('/api/cartItems', {
					cartItem: { ...obj, quantity: 1 },
				});

				if (res.status === 201) {
					dispatch({
						type: 'ADD_TO_CART',
						payload: res.data.cartItem,
					});
				}

				break;
			}

			case 'REMOVE_FROM_WISHLIST': {
				//find the id of the item in the wishlist
				const obj = state.wishListItems.find(
					(wishListItem) =>
						wishListItem.productId === action.payload.productId
				);

				const res = await axios.delete(`/api/wishListItems/${obj.id}`);

				if (res.status === 204) {
					dispatch({
						type: 'REMOVE_FROM_WISHLIST',
						payload: action.payload,
					});
				} else {
					console.log('err in removing item from wishlist');
				}

				break;
			}

			case 'REMOVE_FROM_CART': {
				const res = await axios.delete(
					`/api/cartItems/${action.payload.id}`
				);
				if (res.status === 204) {
					dispatch({
						type: 'REMOVE_FROM_CART',
						payload: action.payload,
					});
				}

				break;
			}

			case 'INCREASE_CART_ITEM_QUANTITY': {
				const obj = {
					...action.payload,
					quantity: action.payload.quantity + 1,
				};

				const res = await axios.put(
					`/api/cartItems/${action.payload.id}`,
					{
						cartItem: obj,
					}
				);

				if (res.status === 200) {
					dispatch({
						type: 'INCREASE_CART_ITEM_QUANTITY',
						payload: res.data.cartItem,
					});
				}

				break;
			}

			case 'DECREASE_CART_ITEM_QUANTITY': {
				const res = await axios.put(
					`/api/cartItems/${action.payload.id}`,
					{
						cartItem: {
							...action.payload,
							quantity: action.payload.quantity - 1,
						},
					}
				);

				if (res.status === 200) {
					dispatch({
						type: 'DECREASE_CART_ITEM_QUANTITY',
						payload: res.data.cartItem,
					});
				}

				break;
			}

			case 'TOGGLE_SHOW_OUT_OF_STOCK': {
				dispatch({ type: 'TOGGLE_SHOW_OUT_OF_STOCK' });
				break;
			}

			case 'TOGGLE_SHOW_FAST_DELIVERY_ONLY': {
				dispatch({ type: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY' });
				break;
			}

			case 'SORT_PRODUCTS_BY_PRICE': {
				dispatch({
					type: 'SORT_PRODUCTS_BY_PRICE',
					payload: action.payload,
				});
				break;
			}

			case 'SET_SEARCH_PRODUCT': {
				dispatch({
					type: 'SET_SEARCH_PRODUCT',
					payload: action.payload,
				});

				break;
			}

			default:
				console.log('err in disaptch wrapper');
				break;
		}
	}

	return dispatchWrapper;
}
