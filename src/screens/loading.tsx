import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppLoading, Linking } from 'expo'
import { checkLogin } from '../actions/login'
import { Spinner } from 'native-base';
import * as Expo from 'expo'
import { loadAsync } from 'expo-font'
import { log } from '../api/base';

interface IDispatchProps {
    checkLogin: () => void
}

interface IStateProps {
    navigateTo: string,
}

class App extends Component<IStateProps & IDispatchProps, { message: string }> {
    render() {
        return (
            <View style={styles.container}>
                <AppLoading />
                <Text>{this.state.message}</Text>
                <Spinner color='gray' />
            </View>
        );
    }
    componentWillMount() {
        try {
            this.setState({ message: 'Checking for Updates' })
            if (!__DEV__) {
                Expo.Updates.checkForUpdateAsync().then((update: any) => {
                    if (update.isAvailable) {
                        this.setState({ message: 'Downloading update' })
                        Expo.Updates.fetchUpdateAsync().then((event: any) => {
                            if (event.isNew)
                                this.setState({ message: 'Build downloaded' })
                            Expo.Updates.reloadFromCache()
                        })
                        // ... notify user of update ...
                    } else {
                        this.setState({ message: 'No Updates Available' })
                        Linking.addEventListener('url', (p: any) => { log(p.url) })
                        this.loadFonts();
                    }
                })
            } else {
                Linking.addEventListener('url', (p: any) => { log(p.url) })
                this.loadFonts();
            }
        } catch (e) {
            // handle or log error
        }
    }
    async loadFonts() {
        await loadAsync({
            Roboto: require('../../Fonts/Roboto.ttf'),
            Roboto_medium: require('../../Fonts/Roboto_medium.ttf'),
            Ionicons: require('../../Fonts/Ionicons.ttf')
        });
        this.props.checkLogin()
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

function mapStateToProps(state: any) {
    const { navigateTo } = state.base
    return {
        navigateTo
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        checkLogin
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
