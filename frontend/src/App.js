import React from 'react';
import { Provider } from 'react-redux';
import store from './model/store';
import Home from './Home';
import './App.scss';

export default () => (
  <div className="App">
    <Provider store={store}>
      <Home />
    </Provider>
  </div>
);
