import { useState } from 'react';
import { useCart, useAuthentication } from '../../contexts';
import { Link, useNavigate } from 'react-router-dom';

import './NavBar.css';

export function NavBar({ setRoute }) {
    const {
        state: { cartItems, wishListItems },
        dispatchWrapper,
    } = useCart();

    const {
        state: { userId },
        logoutUser,
    } = useAuthentication();

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    function handleSearchSubmit() {
        //TODO
        dispatchWrapper({ type: 'SET_SEARCH_PRODUCT', payload: search });
        navigate('/products');
        // setSearch('');
    }

    return (
        <>
            <div className="header-container">
                <div className="header">
                    <h1>Electro Hub</h1>
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

                {userId ? (
                    <button onClick={() => logoutUser(userId)}>Logout</button>
                ) : (
                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                )}

                {/* <button>
                    <Link to="/login">Login</Link>
                </button> */}
            </div>
        </>
    );
}
