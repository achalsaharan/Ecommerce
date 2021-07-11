import { Routes, Route, Navigate } from 'react-router-dom';

import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { WishList } from './pages/WishList';
import { Login } from './pages/login';
import { SignUp } from './pages/SignUp';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { NavBar } from './components/NavBar';

import { useAuthentication } from './contexts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { Footer } from './components/Footer/Footer';

function PrivateRoute({ path, ...props }) {
    const {
        state: { userId },
    } = useAuthentication();

    return userId !== null ? (
        <Route path={path} {...props} />
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    );
}

function App() {
    return (
        <div className="App">
            <ToastContainer hideProgressBar={true} />
            <NavBar />

            <div className="page-container">
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/:productId"
                        element={<ProductPage />}
                    ></Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <PrivateRoute path="/cart" element={<Cart />} />
                    <PrivateRoute path="/wishlist" element={<WishList />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
