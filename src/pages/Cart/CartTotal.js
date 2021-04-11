export function CartTotal({ cartItems }) {
    function calculateTotalPrice() {
        const inStockItems = cartItems.filter((item) => item.inStock === true);

        const price = inStockItems.reduce(
            (acc, curr) => acc + parseInt(curr.price) * curr.quantity,
            0
        );

        return price;
    }
    return (
        <div className="cart-total border-shadow padding1">
            <h5>Cart Total</h5>
            <hr style={{ marginBottom: '1rem' }} />
            <div className="flex-space-between margin-bottom-1">
                <span>
                    Price (
                    {cartItems.filter((item) => item.inStock === true).length}{' '}
                    items)
                </span>
                <span>₹ {calculateTotalPrice()}</span>
            </div>
            <div className="flex-space-between margin-bottom-1">
                <span>Discount</span>
                {calculateTotalPrice() > 0 ? (
                    <span className="primary-text-color">- ₹40</span>
                ) : (
                    <span className="primary-text-color">- ₹0</span>
                )}
            </div>
            <div className="flex-space-between margin-bottom-1">
                <span>Delivery Charges</span>
                <span className="primary-text-color">FREE</span>
            </div>
            <hr style={{ marginBottom: '1rem' }} className="hr-dashed" />
            <div className="flex-space-between margin-bottom-1">
                <span className="bold-font-weight">TOTAL</span>
                <span className="bold-font-weight">
                    ₹
                    {calculateTotalPrice() > 0 ? calculateTotalPrice() - 40 : 0}
                </span>
            </div>
            <button className="btn btn-primary">CHECKOUT</button>
        </div>
    );
}
