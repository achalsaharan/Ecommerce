import axios from 'axios';

export function makeDispatchWrapper(dispatch) {
	async function dispatchWrapper(action) {
		switch (action.type) {
			case 'ADD_TO_CART':
				{
					const res = await axios.post('/api/cartItems', {
						cartItem: { ...action.payload, quantity: 1 },
					});

					if (res.status === 201) {
						dispatch({
							type: 'ADD_TO_CART',
							payload: action.payload,
						});
					}
				}
				break;

			case 'GET_PRODUCTS':
				{
					const res = await axios.get('/api/products');

					if (res.status === 200) {
						dispatch({
							type: 'SET_PRODUCTS',
							payload: res.data.products,
						});
					}
				}

				break;

			default:
				break;
		}
	}

	return dispatchWrapper;
}
