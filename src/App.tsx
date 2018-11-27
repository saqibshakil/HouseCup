import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './components/home'
import store from './store'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    );
  }
}

