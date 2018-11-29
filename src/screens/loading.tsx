import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppLoading, Font } from 'expo'
import { checkLogin } from '../actions/base'

interface IDispatchProps {
    checkLogin: () => void
}

interface IStateProps {
    navigateTo: string
}

class App extends Component<IStateProps & IDispatchProps> {
    render() {
        return (
            <View style={styles.container}>
                <AppLoading />
                <Text>Loading</Text>
            </View>
        );
    }
    componentWillMount() {
        this.loadFonts();
      }
      async loadFonts() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.props.checkLogin()
      }
    componentWillReceiveProps(newProps: IStateProps) {
        const prop = this.props as any
        prop.navigation.navigate(newProps.navigateTo)
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
