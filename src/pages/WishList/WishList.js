import { useCart } from '../../contexts/CartProvider';
import { WishListItemCard } from './WishListItemCart';
import './WishList.css';

export function WishList() {
    const {
        state: { wishListItems },
        dispatch,
        dispatchWrapper,
    } = useCart();

    return (
        <div>
            <h3>Wish List</h3>
            {wishListItems.length === 0 ? (
                <div className="page-empty">
                    <h3>Wish List Is Empty</h3>
                    <i className="fas fa-heart fa-5x"></i>
                </div>
            ) : (
                <div className="cards-display">
                    {wishListItems.map((item) => (
                        <WishListItemCard
                            key={item.id}
                            item={item}
                            dispatch={dispatch}
                            dispatchWrapper={dispatchWrapper}
                            wishListItems={wishListItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
