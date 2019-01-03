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
import { navigateTo } from '../actions/base';
import { NavigationContainerProps } from 'react-navigation';

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
    navigateTo: string,
    params: any,
    back: boolean,
    popToTop: boolean
}

interface IDispatchProps {
    navigate: any
}

const Container = createAppContainer(Nav);
export class App extends Component<NavigationContainerProps & IStateProps & IDispatchProps> {
    componentWillReceiveProps(newProps: IStateProps) {
        // tslint:disable-next-line:no-shadowed-variable
        const { navigateTo } = this.props
        if (navigateTo !== newProps.navigateTo) {
            if (newProps.navigateTo)
                NavigationService.navigate(newProps.navigateTo, newProps.params)
            if (!newProps.navigateTo && newProps.back)
                NavigationService.back()
            if (!newProps.navigateTo && newProps.popToTop)
                NavigationService.back()

        }
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
    // tslint:disable-next-line:no-shadowed-variable
    const { navigateTo, params, back, popToTop } = state.base
    return {
        navigateTo, params, back, popToTop
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        checkLogin,
        navigate: navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
