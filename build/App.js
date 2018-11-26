import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Home from './components/home';
import store from './store';
export default class App extends Component {
    render() {
        return (React.createElement(Provider, { store: store },
            React.createElement(Home, null)));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
//# sourceMappingURL=App.js.map