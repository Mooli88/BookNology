import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './store/library';
import './store/loading';
import './store/user';

ReactDOM.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);
