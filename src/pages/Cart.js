import { useCart } from '../contexts/CartProvider';

export function Cart() {
	const {
		state: { cartItems },
		dispatch,
		dispatchWrapper,
	} = useCart();

	return (
		<div>
			<h3>Cart</h3>
			<div className="cards-display">
				{cartItems.map((item) => (
					<ItemCard
						key={item.id}
						item={item}
						dispatch={dispatch}
						dispatchWrapper={dispatchWrapper}
					/>
				))}
			</div>
		</div>
	);
}

function ItemCard({ item, dispatch, dispatchWrapper }) {
	return (
		<div className="card shadow-box">
			{/* to display out of stock content */}
			{item.inStock ? (
				<div className="out-of-stock">
					<span>OUT OF STOCK</span>
				</div>
			) : null}

			<div className="image-container">
				<img
					className="image-responsive"
					src={item.image}
					alt={'img not avaliable'}
				/>
			</div>
			<div className="card-text-container">
				<p className="bold-font-weight product-title">{item.name}</p>
				<p className="light-font-weight">{item.level} level</p>
				{item.fastDelivery ? <p>Fast Delivery</p> : null}
				<div className="card-price-info">
					<span className="bold-font-weight">₹{item.price}</span>
					<span className="strike-through text-small-size light-font-weight">
						₹799
					</span>
					<span className="primary-text-color light-font-weight text-small-size">
						(30% OFF)
					</span>
					<p></p>
				</div>
				<div className="quantity-control">
					<button>+</button>
					<span>{item.quantity}</span>
					<button>-</button>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: '0rem 1rem',
				}}
			>
				<button
					className="btn btn-secondary"
					onClick={() =>
						dispatchWrapper({
							type: 'ADD_TO_WISHLIST',
							payload: item,
						})
					}
				>
					ADD To Wishlist
				</button>
				<button className="btn btn-secondary">Remove</button>
			</div>
		</div>
	);
}
