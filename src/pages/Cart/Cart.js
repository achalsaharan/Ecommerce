import { useCart } from '../../contexts/CartProvider';
import { CartItemCard } from './CartItemCard';
import { CartTotal } from './CartTotal';
import './Cart.css';

export function Cart() {
	const {
		state: { cartItems, wishListItems },
		dispatch,
		dispatchWrapper,
	} = useCart();

	return (
		<div>
			<h3>Cart</h3>

			<div className="cart-grid">
				{cartItems.length === 0 ? (
					<div className="page-empty">
						<h3>Cart Is Empty</h3>
						<i className="fas fa-shopping-cart fa-5x"></i>
					</div>
				) : (
					<div className="cards-display-cart">
						{cartItems.map((item) => (
							<CartItemCard
								key={item.id}
								item={item}
								dispatch={dispatch}
								dispatchWrapper={dispatchWrapper}
								wishListItems={wishListItems}
							/>
						))}
					</div>
				)}

				<CartTotal cartItems={cartItems} />
			</div>
		</div>
	);
}
