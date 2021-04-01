export function CartItemCard({
	item,
	dispatch,
	dispatchWrapper,
	wishListItems,
}) {
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
