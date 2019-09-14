var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppLoading, Linking } from 'expo';
import { checkLogin } from '../actions/login';
import { Spinner } from 'native-base';
import * as Expo from 'expo';
import { loadAsync } from 'expo-font';
import { log } from '../api/base';
class App extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(AppLoading, null),
            React.createElement(Text, null, this.state.message),
            React.createElement(Spinner, { color: 'gray' })));
    }
    componentWillMount() {
        try {
            this.setState({ message: 'Checking for Updates' });
            if (!__DEV__) {
                Expo.Updates.checkForUpdateAsync().then((update) => {
                    if (update.isAvailable) {
                        this.setState({ message: 'Downloading update' });
                        Expo.Updates.fetchUpdateAsync().then((event) => {
                            if (event.isNew)
                                this.setState({ message: 'Build downloaded' });
                            Expo.Updates.reloadFromCache();
                        });
                        // ... notify user of update ...
                    }
                    else {
                        this.setState({ message: 'No Updates Available' });
                        Linking.addEventListener('url', (p) => { log(p.url); });
                        this.loadFonts();
                    }
                });
            }
            else {
                Linking.addEventListener('url', (p) => { log(p.url); });
                this.loadFonts();
            }
        }
        catch (e) {
            // handle or log error
        }
    }
    loadFonts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield loadAsync({
                Roboto: require('../../Fonts/Roboto.ttf'),
                Roboto_medium: require('../../Fonts/Roboto_medium.ttf'),
                Ionicons: require('../../Fonts/Ionicons.ttf')
            });
            this.props.checkLogin();
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
function mapStateToProps(state) {
    const { navigateTo } = state.base;
    return {
        navigateTo
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkLogin
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=loading.js.map