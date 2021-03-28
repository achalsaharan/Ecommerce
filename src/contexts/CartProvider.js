import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({children}){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts(){
            try {
                const res = await axios.get('/api/products');
                console.log(res.data.products);
                setProducts(res.data.products);
            } catch (err) {
                console.log('error in getting products', err);
            }
        }

        getProducts();
    }, [])

    return(
        <CartContext.Provider value={{products}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext);
}