import 'core-js/es6/map';
import 'core-js/es6/set';
import 'babel-polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-table/react-table.css'
import './index.css';
import './components/footer/footer.css';
import './searchResults/SearchResult.css';
import './components/scrollTopButton/scrollTopButton.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
