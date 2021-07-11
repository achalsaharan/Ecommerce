import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts';
// import { cartProvider } from '../../contexts/CartContext';
import './ProductPage.css';

export function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(undefined);
    const {
        state: { products },
    } = useCart();

    const { dispatchWrapper } = useCart();

    useEffect(() => {
        const product = products.find((item) => item._id === productId);
        setProduct(product);
    }, [products]);

    console.log({ product });

    return (
        <div>
            {product ? (
                <div className="product-preview-container">
                    <div>
                        <img class="image-responsive" src={product.image} />
                    </div>
                    <div className="product-info">
                        <h5>{product.name}</h5>
                        <h6 className="light-font-weight">
                            ₹ {product.price}
                            {product.discount > 0 && (
                                <span className="text-size-small primary-text-color">
                                    {' '}
                                    ({product.discount}% OFF)
                                </span>
                            )}
                            <span class="rating">
                                <span>5</span>
                                <span>
                                    <i class="fas fa-star fa-sm"></i>
                                </span>
                            </span>
                        </h6>
                        <hr />

                        <div className="additional-info">
                            <p>
                                <i class="fas fa-clipboard-check"></i>
                                {product.inStock ? (
                                    <span style={{ color: 'green' }}>
                                        In Stock
                                    </span>
                                ) : (
                                    <span style={{ color: 'red' }}>
                                        Currently Out Of Stock
                                    </span>
                                )}
                            </p>
                            <p>
                                <i class="fas fa-level-up-alt"></i>
                                {product.level} level
                            </p>
                            {product.fastDelivery ? (
                                <p>
                                    <i class="fas fa-truck"></i>
                                    Fast Delivery Avaliable
                                </p>
                            ) : null}
                        </div>

                        <div style={{ flexGrow: '1' }}>
                            {product.description.map((point, idx) => (
                                <p key="idx" className="light-font-weight">
                                    {idx + 1}. {point}
                                </p>
                            ))}
                        </div>

                        <div className="buttons-container">
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

                            <button
                                className="btn btn-secondary"
                                onClick={() =>
                                    dispatchWrapper({
                                        type: 'ADD_TO_WISHLIST',
                                        payload: product,
                                    })
                                }
                            >
                                Add To Wish List
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <h4>oops product not found :(</h4>
            )}
        </div>
    );
}
