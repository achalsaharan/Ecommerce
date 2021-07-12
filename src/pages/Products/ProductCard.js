import { useAuthentication } from '../../contexts';
import { useNavigate, Navigate } from 'react-router-dom';

export function ProductCard({ product, dispatchWrapper, wishListItems }) {
    const {
        state: { userId },
    } = useAuthentication();

    const navigate = useNavigate();

    function handleLikeButtonClick(item) {
        if (userId === null) {
            console.log('navigating to login');
            return navigate('/login');
        }

        if (
            //if already in wishlist
            wishListItems.find(
                (wishListItem) => wishListItem._id === item._id
            ) !== undefined
        ) {
            dispatchWrapper({ type: 'REMOVE_FROM_WISHLIST', payload: item });
        } else {
            //if not in wishlist
            dispatchWrapper({ type: 'ADD_TO_WISHLIST', payload: item });
        }
    }

    function handleBuyBtnClick(product) {
        if (userId === null) {
            console.log('navigating to login');
            return navigate('/login');
        }

        navigate(`/products/${product._id}`);

        // dispatchWrapper({
        //     type: 'ADD_TO_CART',
        //     payload: product,
        // });
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
                                    wishListItem._id === product._id
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
                                        wishListItem._id === product._id
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
                    onClick={() => handleBuyBtnClick(product)}
                >
                    Buy
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
