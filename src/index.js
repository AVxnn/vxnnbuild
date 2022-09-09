import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.sass'
import store from "./store/store";
import {Provider} from "react-redux";
import app from './entities/firebase/firebase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

