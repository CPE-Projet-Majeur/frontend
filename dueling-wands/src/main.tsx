/**
 * @author Thibault Berthet
 */


import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx'
import { store } from './store';
import React from 'react';

// For server side rendering
if (typeof window !== 'undefined') {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </StrictMode>,
    )
}
