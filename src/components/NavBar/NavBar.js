import { useState } from 'react';
import { useCart } from '../../contexts';
import { Link } from 'react-router-dom';
import './NavBar.css';
export function NavBar({ setRoute }) {
    const {
        state: { cartItems, wishListItems },
        dispatchWrapper,
    } = useCart();

    const [search, setSearch] = useState('');

    function handleSearchSubmit() {
        //TODO
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
                </div>
            </div>

            <div className="links-bar border-shadow">
                <button>
                    <Link to="/">Home</Link>
                </button>

                <button>
                    <Link to="/products">Products</Link>
                </button>

                <button style={{ marginLeft: 'auto' }} className="icon">
                    <Link to="/wishlist">
                        <i className="fas fa-heart fa-lg"></i>
                        {wishListItems.length > 0 ? (
                            <div className="icon-badge">
                                {wishListItems.length}
                            </div>
                        ) : null}
                    </Link>
                </button>

                <button>
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart fa-lg"></i>
                        {cartItems.length > 0 ? (
                            <div className="icon-badge">{cartItems.length}</div>
                        ) : null}
                    </Link>
                </button>

                <button>
                    <Link to="/login">Login</Link>
                </button>
            </div>
        </>
    );
}
