import { useState } from 'react';
import './App.css';
import { Products } from './pages/Products';
import {Cart} from './pages/Cart';


function App() {

  const [route, setRoute] = useState('products');
  return (
    <div className="page-container">
      <h2 style={{textAlign: "center"}}>E-commerce</h2>
      <div className="route-btn-group">
        <button onClick={() => setRoute('products')}className="btn btn-primary">Products</button>
        <button onClick={() => setRoute('cart')} className="btn btn-primary">Cart</button>
        <button className="btn btn-primary">Wish List</button>
      </div>
      {route === 'products' && <Products />}
      {route === 'cart' && <Cart />}
    </div>
    
  );
}

export default App;
