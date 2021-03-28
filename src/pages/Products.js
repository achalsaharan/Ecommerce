import { useCart} from '../contexts/CartProvider';

export function Products(){

    const {products} = useCart();

    return (
        <div >
            <h3> Products </h3>
            <div className="cards-display">
                {products.map((product, idx) => <ProductCard key={product.id} product={product} />)}
            </div>
            
        </div>
    )
}

function ProductCard({product}){
    return(
        <div className="card shadow-box">
            {product.inStock ? 
                <div className="out-of-stock">
                    <span>OUT OF STOCK</span>
                </div>
                : 
                null
            }
            
            <div className="image-container">
                <img className="image-responsive" src={product.image} alt={"img not avaliable"}/>
            </div>
            <div className="card-text-container">
                <p className="bold-font-weight product-title">{product.name}</p>
                <p className="light-font-weight">{product.level} level</p>
                {product.fastDelivery ? <p>Fast Delivery</p> : null}
                <div className="card-price-info">
                        <span className="bold-font-weight">₹{product.price}</span>
                        <span className="strike-through text-small-size light-font-weight">₹799</span>
                        <span className="primary-text-color light-font-weight text-small-size">(30% OFF)</span><p></p>
                </div>
                
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: "0rem 1rem"}}>
                <button className="btn btn-primary">Add To Cart</button>
                <button className="btn btn-secondary">Add To Wishlist</button>
            </div>
            
        </div>
    )
}