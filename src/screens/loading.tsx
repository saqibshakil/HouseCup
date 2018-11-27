import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
                <Text>Loading</Text>
            </View>
        );
    }

    componentWillReceiveProps(newProps: IStateProps) {
        const prop = this.props as any
        prop.navigation.navigate(newProps.navigateTo)
    }

    componentDidMount(){
            }

    componentWillMount(){
        console.log('Loading mounted')
        this.props.checkLogin()

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
