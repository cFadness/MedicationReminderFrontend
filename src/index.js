import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/App';
const reactDom = require("react-dom");



reactDom.render(
    <Router>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>,
    document.getElementById('root')
);