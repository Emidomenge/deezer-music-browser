import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './assets/css/tachyons.min.css';
import 'react-table/react-table.css';
import './index.css';
// TODO:
import './components/footer/index.css';
import './components/scrollTopButton/index.css';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
