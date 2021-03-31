import { useCart } from '../contexts/CartProvider';

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
					<CartEmpty />
				) : (
					<div className="cards-display-cart">
						{cartItems.map((item) => (
							<ItemCard
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

function CartEmpty() {
	return (
		<div class="page-empty">
			<h3>Cart Is Empty</h3>
			<i class="fas fa-shopping-cart fa-5x"></i>
		</div>
	);
}

function ItemCard({ item, dispatch, dispatchWrapper, wishListItems }) {
	function handleLikeButtonClick(item) {
		if (
			//if already in wishlist
			wishListItems.find(
				(wishListItem) => wishListItem.productId === item.productId
			) !== undefined
		) {
			dispatchWrapper({ type: 'REMOVE_FROM_WISHLIST', payload: item });
		} else {
			//if not in wishlist
			dispatchWrapper({ type: 'ADD_TO_WISHLIST', payload: item });
		}
	}
	return (
		<div className="card shadow-box">
			{/* to display out of stock content */}
			{item.inStock === false ? (
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
				<button
					onClick={() => handleLikeButtonClick(item)}
					className="like-product-btn"
					style={{
						backgroundColor:
							wishListItems.find(
								(wishListItem) =>
									wishListItem.productId === item.productId
							) !== undefined
								? 'red'
								: '#fff',
					}}
				>
					<i
						className="far fa-heart la-lg"
						style={{
							color:
								wishListItems.find(
									(wishListItem) =>
										wishListItem.productId ===
										item.productId
								) !== undefined
									? '#fff'
									: 'red',
						}}
					></i>
				</button>
				<span className="product-rating">
					<div className="rating">
						<span>{item.ratings}</span>
						<span>
							<i className="fas fa-star"></i>
						</span>
					</div>
				</span>
			</div>
			<div className="card-text-container">
				<p className="bold-font-weight product-title">{item.name}</p>
				<p className="light-font-weight">{item.level} level</p>
				{item.fastDelivery ? <p>Fast Delivery</p> : null}
			</div>

			<div className="card-price-info" style={{ marginLeft: '1rem' }}>
				<span className="bold-font-weight">₹{item.price}</span>
				{item.discount > 0 ? (
					<span className="primary-text-color light-font-weight text-small-size">
						({item.discount}% OFF)
					</span>
				) : null}
			</div>

			<div className="quantity-control">
				<button
					onClick={() =>
						dispatchWrapper({
							type: 'INCREASE_CART_ITEM_QUANTITY',
							payload: item,
						})
					}
				>
					+
				</button>
				<span>{item.quantity}</span>
				<button
					onClick={() =>
						dispatchWrapper({
							type: 'DECREASE_CART_ITEM_QUANTITY',
							payload: item,
						})
					}
				>
					-
				</button>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: '0rem 1rem',
				}}
			>
				{/* <button
					className="btn btn-secondary"
					onClick={() =>
						dispatchWrapper({
							type: 'ADD_TO_WISHLIST',
							payload: item,
						})
					}
				>
					Add To Wishlist
				</button> */}
				<button
					className="btn btn-secondary"
					onClick={() =>
						dispatchWrapper({
							type: 'REMOVE_FROM_CART',
							payload: item,
						})
					}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

function CartTotal({ cartItems }) {
	function calculateTotalPrice() {
		const inStockItems = cartItems.filter((item) => item.inStock === true);

		const price = inStockItems.reduce(
			(acc, curr) => acc + parseInt(curr.price) * curr.quantity,
			0
		);

		return price;
	}
	return (
		<div className="cart-total border-shadow padding1">
			<h5>Cart Total</h5>
			<hr style={{ marginBottom: '1rem' }} />
			<div className="flex-space-between margin-bottom-1">
				<span>
					Price (
					{cartItems.filter((item) => item.inStock === true).length}{' '}
					items)
				</span>
				<span>₹ {calculateTotalPrice()}</span>
			</div>
			<div className="flex-space-between margin-bottom-1">
				<span>Discount</span>
				{calculateTotalPrice() > 0 ? (
					<span className="primary-text-color">- ₹40</span>
				) : (
					<span className="primary-text-color">- ₹0</span>
				)}
			</div>
			<div className="flex-space-between margin-bottom-1">
				<span>Delivery Charges</span>
				<span className="primary-text-color">FREE</span>
			</div>
			<hr style={{ marginBottom: '1rem' }} className="hr-dashed" />
			<div className="flex-space-between margin-bottom-1">
				<span className="bold-font-weight">TOTAL</span>
				<span className="bold-font-weight">
					₹
					{calculateTotalPrice() > 0 ? calculateTotalPrice() - 40 : 0}
				</span>
			</div>
			<button className="btn btn-primary">CHECKOUT</button>
		</div>
	);
}
