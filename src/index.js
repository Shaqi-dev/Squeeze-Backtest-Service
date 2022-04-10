import * as ReactDOMClient from 'react-dom/client';
import App from './components/app';
import "./index.css"
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import intervalsApp from './store/intervals/intervals';

const store = createStore(intervalsApp);
store.subscribe(() => console.log(store.getState()))

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider> 
    </React.StrictMode>   
);

