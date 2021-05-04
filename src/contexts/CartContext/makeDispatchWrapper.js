import axios from 'axios';
import { isPresentInArray } from './arrayUtils';
const API = 'http://localhost:3999';

export const ActionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_WISHLIST: 'SET_WISHLIST',
    SET_CART: 'SET_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    INCREASE_CART_ITEM_QUANTITY: 'INCREASE_CART_ITEM_QUANTITY',
    DECREASE_CART_ITEM_QUANTITY: 'DECREASE_CART_ITEM_QUANTITY',
    TOGGLE_SHOW_OUT_OF_STOCK: 'TOGGLE_SHOW_OUT_OF_STOCK',
    TOGGLE_SHOW_FAST_DELIVERY_ONLY: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY',
    SORT_PRODUCTS_BY_PRICE: 'SORT_PRODUCTS_BY_PRICE',
    SET_SEARCH_PRODUCT: 'SET_SEARCH_PRODUCT',
};

export function makeDispatchWrapper(
    state,
    dispatch,
    userId,
    cartId,
    wishListId
) {
    async function dispatchWrapper(action) {
        switch (action.type) {
            case 'GET_PRODUCTS': {
                console.log('getting products..');
                const res = await axios.get(`${API}/products`);
                if (res.status === 200) {
                    dispatch({
                        type: 'SET_PRODUCTS',
                        payload: res.data.products,
                    });
                }

                break;
            }

            case 'GET_WISHLIST': {
                console.log('loading wishlist....');
                const res = await axios.get(`${API}/wishlists/${wishListId}`);

                if (res.status === 200) {
                    dispatch({
                        type: 'SET_WISHLIST',
                        payload: res.data.products,
                    });
                }
                break;
            }

            case 'GET_CART': {
                console.log('loading cart....');
                const res = await axios.get(`${API}/carts/${cartId}`);

                if (res.status === 200) {
                    dispatch({
                        type: 'SET_CART',
                        payload: res.data.products,
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
                console.log('adding to wishlist....');
                const res = await axios.post(`${API}/wishlists/${wishListId}`, {
                    _id: action.payload._id,
                });

                if (res.status === 201) {
                    dispatch({
                        type: 'ADD_TO_WISHLIST',
                        payload: res.data.product,
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

                // const obj = { ...action.payload };
                console.log('adding to cart', action.payload);
                // delete obj.id;

                // const res = await axios.post('/api/cartItems', {
                //     cartItem: { ...obj, quantity: 1 },
                // });

                const res = await axios.post(`${API}/carts/${cartId}`, {
                    _id: action.payload._id,
                    quantity: 1,
                });

                console.log({ res });

                if (res.status === 201) {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: res.data.product,
                    });
                }

                break;
            }

            case 'REMOVE_FROM_WISHLIST': {
                const res = await axios.delete(
                    `${API}/wishlists/${wishListId}`,
                    {
                        data: {
                            _id: action.payload._id,
                        },
                    }
                );

                if (res.status === 201) {
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
                const res = await axios.delete(`${API}/carts/${cartId}`, {
                    _id: action.payload._id,
                });
                if (res.status === 204) {
                    dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: action.payload,
                    });
                }

                break;
            }

            case 'INCREASE_CART_ITEM_QUANTITY': {
                const res = await axios.post(`${API}/carts/${cartId}`, {
                    _id: action.payload._id,
                    quantity: action.payload.quantity + 1,
                });

                if (res.status === 201) {
                    dispatch({
                        type: 'INCREASE_CART_ITEM_QUANTITY',
                        payload: res.data.product,
                    });
                }

                break;
            }

            case 'DECREASE_CART_ITEM_QUANTITY': {
                const res = await axios.post(`${API}/carts/${cartId}`, {
                    _id: action.payload._id,
                    quantity: action.payload.quantity - 1,
                });

                if (res.status === 201) {
                    dispatch({
                        type: 'DECREASE_CART_ITEM_QUANTITY',
                        payload: res.data.product,
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
