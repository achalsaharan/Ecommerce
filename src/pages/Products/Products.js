import { useCart } from '../../contexts/CartProvider';
import { ProductCard } from './ProductCard';
import { FilterPanel } from './FilterPanel';
import './Products.css';

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

	const data = getFilteredData(
		products,
		showFastDeliveryOnly,
		showOutOfStock,
		sortBy,
		searchProduct
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

function getFilteredData(
	intitialData,
	showFastDeliveryOnly,
	showOutOfStock,
	sortBy,
	searchProduct
) {
	let data = [...intitialData];

	//search result
	if (searchProduct !== '') {
		data = data.filter(
			(item) =>
				item.name.toUpperCase().search(searchProduct.toUpperCase()) !==
				-1
		);
	}

	data = data.filter((item) => item.fastDelivery || !showFastDeliveryOnly);

	data = data.filter((item) => item.inStock || showOutOfStock);

	if (sortBy === 'HIGH_TO_LOW') {
		data.sort((a, b) => b.price - a.price);
	} else if (sortBy === 'LOW_TO_HIGH') {
		data.sort((a, b) => a.price - b.price);
	}

	return data;
}
