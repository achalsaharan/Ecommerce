import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';

import { CartProvider, AuthenticationProvider } from './contexts';

import { BrowserRouter as Router } from 'react-router-dom';

import { setupMockServer } from './api/server';
// setupMockServer();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthenticationProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthenticationProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
