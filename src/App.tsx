import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './components/home'
import store from './store'
import { Root } from 'native-base'
export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <Home />
        </Provider>
      </Root>
    );
  }
}

