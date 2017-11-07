/*
    ./client/index.js
    webpack entry
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';
import SCSS from './style/style.scss';

ReactDOM.render(<App />, document.getElementById('root'));