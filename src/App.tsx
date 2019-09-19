import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './components/home'
import store from './store'
import { Root, StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material';
import { Linking } from 'expo';
import throttle from './utils/thottle';
import { log } from './api/base';
export default class App extends Component {
  componentDidMount() {
    const logToApi = throttle(p => {
      if (p) {
        if (p.url) {
          const arr = p.url.split('?')
          const path = arr.length && arr[0]
          const queryParams = arr.length > 1 && arr[1]

          log(`Path: ${path} Query: ${JSON.stringify(queryParams)}`)
        }
      }
    }, 50, {})
    Linking.addEventListener('url', (p: any) => logToApi(p))
    Linking.getInitialURL().then((p: string) => logToApi({ url: p }))
  }
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
