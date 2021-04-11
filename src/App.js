import { useState } from 'react';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { WishList } from './pages/WishList';
import { NavBar } from './components/NavBar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
