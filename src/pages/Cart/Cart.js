import { useCart } from '../../contexts';
import { CartItemCard } from './CartItemCard';
import { CartTotal } from './CartTotal';
import './Cart.css';

export function Cart() {
    const {
        state: { cartItems, wishListItems },
        dispatchWrapper,
    } = useCart();

    return (
        <div>
            <h3>Cart</h3>

            <div className="cart-grid">
                {cartItems.length === 0 ? (
                    <div className="page-empty">
                        <h3>Cart Is Empty</h3>
                        <i className="fas fa-shopping-cart fa-5x"></i>
                    </div>
                ) : (
                    <div className="cards-display-cart">
                        {cartItems.map((item) => (
                            <CartItemCard
                                key={item._id}
                                item={item}
                                dispatchWrapper={dispatchWrapper}
                                wishListItems={wishListItems}
                            />
                        ))}
                    </div>
                )}

                <CartTotal cartItems={cartItems} />
            </div>
        </div>
    );
}
