import { useState } from 'react';
import { useCart } from '../contexts/CartProvider';

export function Products() {
	const {
		state: {
			products,
			sortBy,
			showOutOfStock,
			showFastDeliveryOnly,
			wishListItems,
			searchProduct,
		},
		dispatch,
		dispatchWrapper,
	} = useCart();

	function getFilteredData(
		intitialData,
		showFastDeliveryOnly,
		showOutOfStock,
		sortBy
	) {
		let data = [...intitialData];

		//search result
		if (searchProduct !== '') {
			data = data.filter(
				(item) =>
					item.name
						.toUpperCase()
						.search(searchProduct.toUpperCase()) !== -1
			);
		}

		data = data.filter(
			(item) => item.fastDelivery || !showFastDeliveryOnly
		);

		data = data.filter((item) => item.inStock || showOutOfStock);

		if (sortBy === 'HIGH_TO_LOW') {
			data.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'LOW_TO_HIGH') {
			data.sort((a, b) => a.price - b.price);
		}

		return data;
	}

	const data = getFilteredData(
		products,
		showFastDeliveryOnly,
		showOutOfStock,
		sortBy
	);

	return (
		<div>
			{/* <h3> Products </h3> */}
			<FilterPanel
				dispatch={dispatch}
				dispatchWrapper={dispatchWrapper}
			/>
			<div className="cards-display">
				{data.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						dispatch={dispatch}
						dispatchWrapper={dispatchWrapper}
						wishListItems={wishListItems}
					/>
				))}
			</div>
		</div>
	);
}

function FilterPanel({
	product,
	dispatch,
	dispatchWrapper,
	showFastDeliveryOnly,
	showOutOfStock,
}) {
	const [showRefineSearch, setShowRefineSearch] = useState(false);
	return (
		<div className="border-shadow padding1">
			<div className="flex-space-between">
				<span className="bold-font-weight">Refine Search</span>
				<button
					className="show-search-options"
					onClick={() => setShowRefineSearch(!showRefineSearch)}
				>
					<i className="fas fa-chevron-down fa-lg"></i>
				</button>
			</div>
			{/* //todo fix this hack */}
			<div
				className="refine-search"
				style={{ display: showRefineSearch ? 'flex' : 'none' }}
			>
				<div className="filter-group">
					<p className="bold-font-weight">Price</p>
					<label className="light-font-weight">
						<input
							type="radio"
							name="sort"
							onClick={() =>
								dispatchWrapper({
									type: 'SORT_PRODUCTS_BY_PRICE',
									payload: 'HIGH_TO_LOW',
								})
							}
						/>
						High To Low
					</label>
					<label className="light-font-weight">
						<input
							type="radio"
							name="sort"
							onClick={() =>
								dispatchWrapper({
									type: 'SORT_PRODUCTS_BY_PRICE',
									payload: 'LOW_TO_HIGH',
								})
							}
						/>
						Low To High
					</label>
				</div>

				<div className="filter-group">
					<p className="bold-font-weight">Filter</p>
					<label className="light-font-weight">
						<input
							type="checkbox"
							checked={showFastDeliveryOnly}
							onChange={() =>
								dispatchWrapper({
									type: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY',
								})
							}
						/>
						Fast Delivery Only
					</label>
					<label className="light-font-weight">
						<input
							type="checkbox"
							checked={showOutOfStock}
							onChange={() =>
								dispatchWrapper({
									type: 'TOGGLE_SHOW_OUT_OF_STOCK',
								})
							}
						/>
						In Stock Only
					</label>
				</div>
			</div>
			<div className="refine-search">
				<div className="refine-search">
					<div className="filter-group">
						<p className="bold-font-weight">Price</p>
						<label className="light-font-weight">
							<input
								type="radio"
								name="sort"
								onClick={() =>
									dispatchWrapper({
										type: 'SORT_PRODUCTS_BY_PRICE',
										payload: 'HIGH_TO_LOW',
									})
								}
							/>
							High To Low
						</label>
						<label className="light-font-weight">
							<input
								type="radio"
								name="sort"
								onClick={() =>
									dispatchWrapper({
										type: 'SORT_PRODUCTS_BY_PRICE',
										payload: 'LOW_TO_HIGH',
									})
								}
							/>
							Low To High
						</label>
					</div>

					<div className="filter-group">
						<p className="bold-font-weight">Filter</p>
						<label className="light-font-weight">
							<input
								type="checkbox"
								checked={showFastDeliveryOnly}
								onChange={() =>
									dispatchWrapper({
										type: 'TOGGLE_SHOW_FAST_DELIVERY_ONLY',
									})
								}
							/>
							Fast Delivery Only
						</label>
						<label className="light-font-weight">
							<input
								type="checkbox"
								checked={showOutOfStock}
								onChange={() =>
									dispatchWrapper({
										type: 'TOGGLE_SHOW_OUT_OF_STOCK',
									})
								}
							/>
							In Stock Only
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProductCard({ product, dispatch, dispatchWrapper, wishListItems }) {
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
			{product.inStock === false ? (
				<div className="out-of-stock">
					<span>OUT OF STOCK</span>
				</div>
			) : null}

			<div className="image-container">
				<img
					className="image-responsive"
					src={product.image}
					alt={'img not avaliable'}
				/>
				<button
					onClick={() => handleLikeButtonClick(product)}
					className="like-product-btn"
					style={{
						backgroundColor:
							wishListItems.find(
								(wishListItem) =>
									wishListItem.productId === product.productId
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
										product.productId
								) !== undefined
									? '#fff'
									: 'red',
						}}
					></i>
				</button>
				<span className="product-rating">
					<div className="rating">
						<span>{product.ratings}</span>
						<span>
							<i className="fas fa-star"></i>
						</span>
					</div>
				</span>
			</div>
			<div className="card-text-container">
				<p className="bold-font-weight product-title">{product.name}</p>
				<p className="light-font-weight">{product.level} level</p>
				{product.fastDelivery ? <p>Fast Delivery</p> : null}
			</div>

			<div className="card-price-info" style={{ marginLeft: '1rem' }}>
				<span className="bold-font-weight">₹{product.price}</span>
				{product.discount > 0 ? (
					<span className="primary-text-color light-font-weight text-small-size">
						({product.discount}% OFF)
					</span>
				) : null}
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					margin: '0rem 1rem',
				}}
			>
				<button
					className="btn btn-primary"
					onClick={() =>
						dispatchWrapper({
							type: 'ADD_TO_CART',
							payload: product,
						})
					}
				>
					Add To Cart
				</button>
				{/* <button
					className="btn btn-secondary"
					onClick={() =>
						dispatchWrapper({
							type: 'ADD_TO_WISHLIST',
							payload: product,
						})
					}
				>
					Add To Wishlist
				</button> */}
			</div>
		</div>
	);
}
