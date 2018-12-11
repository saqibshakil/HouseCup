import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Admin from '../screens/admin'
import PreLogin from '../screens/preLogin'
import Teacher from '../screens/teacher'
import Student from '../screens/student'
import Loading from '../screens/loading'
import { View } from 'react-native';
import { checkLogin } from '../actions/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationService from './navigationService';
const Nav = createSwitchNavigator({
    Loading: {
        screen: Loading
    },
    Admin: {
        screen: Admin
    },
    PreLogin: {
        screen: PreLogin
    },
    Teacher: {
        screen: Teacher
    },
    Student: {
        screen: Student
    }
}, {
    initialRouteName: 'Loading'
} as any)


interface IStateProps {
    navigateTo: string
}

const Container = createAppContainer(Nav);
export class App extends Component<IStateProps> {
    componentWillReceiveProps(newProps: IStateProps) {
        if (this.props.navigateTo !== newProps.navigateTo)
            NavigationService.navigate(newProps.navigateTo)
    }

    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Container ref={(navigatorRef: any) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
            </View>
        );
    }
}

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
