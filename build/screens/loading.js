var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppLoading, Font } from 'expo';
import { checkLogin } from '../actions/base';
class App extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(AppLoading, null),
            React.createElement(Text, null, "Loading")));
    }
    componentWillMount() {
        this.loadFonts();
    }
    loadFonts() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
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