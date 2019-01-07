import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Admin from '../screens/admin'
import PreLogin from '../screens/preLogin'
import Teacher from '../screens/teacher'
import Student from '../screens/student'
import Loading from '../screens/loading'
import { View, BackHandler } from 'react-native';
import { checkLogin } from '../actions/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationService from './navigationService';
import { navigateTo, back } from '../actions/base';
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
    base: {
        navigateTo: string,
        params: any,
        back: boolean,
        popToTop: boolean
    }
}

interface IDispatchProps {
    navigate: any,
    back: () => void
}

const Container = createAppContainer(Nav);
export class App extends Component<NavigationContainerProps & IStateProps & IDispatchProps> {
    componentWillReceiveProps(newProps: IStateProps) {
        // tslint:disable-next-line:no-shadowed-variable
        const base = newProps.base
        if (this.props.base !== base) {
            if (base.navigateTo)
                NavigationService.navigate(base.navigateTo, base.params)
            if (base.back)
                NavigationService.back()
            if (base.popToTop)
                NavigationService.back()
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.back()
        return true
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
    return {
        base: state.base
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        checkLogin,
        back,
        navigate: navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
