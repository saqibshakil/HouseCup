import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
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
            <ImageBackground source={require('../../assets/splash2.png')} style={styles.container}>
                <AppLoading />
                <Text style={{ paddingTop: 350 }}>{this.state.message}</Text>
                <Spinner color='gray' />
            </ImageBackground>
        );
    }
    componentWillMount() {
        try {
            Expo.SplashScreen.hide()
            this.setState({ message: 'Checking for Updates' })
            if (!__DEV__) {
                log('Checking for Updates')
                Expo.Updates.checkForUpdateAsync().then((update: any) => {
                    if (update.isAvailable) {
                        this.setState({ message: 'Downloading update' })
                        log('Downloading update')
                        Expo.Updates.fetchUpdateAsync().then((event: any) => {
                            if (event.isNew) {
                                this.setState({ message: 'Build downloaded' })
                                log('Build downloaded')
                                Expo.Updates.reloadFromCache().then(() => {
                                    log('reloaded')
                                    this.loadFonts();
                                })
                            }
                        })
                        // ... notify user of update ...
                    } else {
                        log('No Updates')
                        this.setState({ message: 'No Updates Available' })
                        this.loadFonts();
                    }
                })
            } else {
                this.loadFonts();
            }
        } catch (e) {
            log(JSON.stringify(e))
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
