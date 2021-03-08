import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
 <Provider store={store}>
  <App />
 </Provider>,
 document.getElementById('root')
);
