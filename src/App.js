import { useState } from 'react';
import './App.css';
import { Products } from './pages/Products/Products';
import { Cart } from './pages/Cart/Cart';
import { WishList } from './pages/WishList/WishList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from './components/NavBar/NavBar';

function App() {
	const [route, setRoute] = useState('products');
	return (
		<div className="App">
			<ToastContainer />
			<NavBar setRoute={setRoute} />
			<div className="page-container">
				{route === 'products' && <Products />}
				{route === 'cart' && <Cart />}
				{route === 'wishList' && <WishList />}
			</div>
		</div>
	);
}

export default App;
