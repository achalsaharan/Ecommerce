import { useState } from 'react';
import './App.css';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { WishList } from './pages/WishList';
import { useCart } from './contexts/CartProvider';

function NavBar({ setRoute }) {
	const {
		state: { cartItems, wishListItems },
	} = useCart();

	return (
		<div className="header-container">
			<div className="header">
				<h1>ecommerce</h1>
				<div className="header-links">
					<button
						className="icon"
						onClick={() => setRoute('wishList')}
					>
						<i className="fas fa-heart fa-lg"></i>
						{wishListItems.length > 0 ? (
							<div className="icon-badge">
								{wishListItems.length}
							</div>
						) : null}
					</button>

					<button onClick={() => setRoute('cart')}>
						<i className="fas fa-shopping-cart fa-lg"></i>
						{cartItems.length > 0 ? (
							<div className="icon-badge">{cartItems.length}</div>
						) : null}
					</button>
				</div>
			</div>
		</div>
	);
}

function App() {
	const [route, setRoute] = useState('products');
	return (
		<>
			<NavBar setRoute={setRoute} />
			<div className="page-container">
				<div className="route-btn-group">
					<button
						onClick={() => setRoute('products')}
						className="btn btn-primary"
					>
						Products
					</button>
					<button
						onClick={() => setRoute('cart')}
						className="btn btn-primary"
					>
						<i className="fas fa-shopping-cart"></i>
					</button>
					<button
						onClick={() => setRoute('wishList')}
						className="btn btn-primary"
					>
						<i className="fas fa-heart"></i>
					</button>
				</div>
				{route === 'products' && <Products />}
				{route === 'cart' && <Cart />}
				{route === 'wishList' && <WishList />}
			</div>
		</>
	);
}

export default App;
