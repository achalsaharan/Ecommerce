import { useState } from 'react';
import './App.css';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { WishList } from './pages/WishList';
import { useCart } from './contexts/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar({ setRoute }) {
	const {
		state: { cartItems, wishListItems },
		dispatchWrapper,
	} = useCart();

	const [search, setSearch] = useState('');

	function handleSearchSubmit() {
		setRoute('products');
		dispatchWrapper({ type: 'SET_SEARCH_PRODUCT', payload: search });
		// setSearch('');
	}

	return (
		<>
			<div className="header-container">
				<div className="header">
					<h1>ecommerce</h1>
					<div className="header-search-bar border-shadow">
						<input
							type="text"
							placeholder="search products"
							value={search}
							onSubmit={() => handleSearchSubmit()}
							onKeyDown={(e) =>
								e.key === 'Enter' ? handleSearchSubmit() : null
							}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button onClick={() => handleSearchSubmit()}>
							<i className="fas fa-search fa-lg"></i>
						</button>
					</div>

					{/* <div className="header-links">
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
				</div> */}
				</div>
			</div>
			<div className="links-bar border-shadow">
				<button onClick={() => setRoute('products')}>Home</button>
				<button onClick={() => setRoute('products')}>Products</button>
				<button
					style={{ marginLeft: 'auto' }}
					className="icon"
					onClick={() => setRoute('wishList')}
				>
					<i className="fas fa-heart fa-lg"></i>
					{wishListItems.length > 0 ? (
						<div className="icon-badge">{wishListItems.length}</div>
					) : null}
				</button>
				<button onClick={() => setRoute('cart')}>
					<i className="fas fa-shopping-cart fa-lg"></i>
					{cartItems.length > 0 ? (
						<div className="icon-badge">{cartItems.length}</div>
					) : null}
				</button>
			</div>
		</>
	);
}

function App() {
	const [route, setRoute] = useState('products');
	return (
		<div className="App">
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<NavBar setRoute={setRoute} />
			<div className="page-container">
				{/* <div className="route-btn-group">
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
				</div> */}
				{route === 'products' && <Products />}
				{route === 'cart' && <Cart />}
				{route === 'wishList' && <WishList />}
			</div>
		</div>
	);
}

export default App;
