import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import {setupMockServer} from './api/server';
import {CartProvider} from './contexts/CartProvider';
setupMockServer();


ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
