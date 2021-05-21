import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './App.router';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import { Provider } from 'react-redux';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
