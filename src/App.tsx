import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './components/home'
import store from './store'
import { Root, StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material';
export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Root>
          <Provider store={store}>
            <Home />
          </Provider>
        </Root>
      </StyleProvider>
    );
  }
}
