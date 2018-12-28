import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Admin from '../screens/admin';
import PreLogin from '../screens/preLogin';
import Teacher from '../screens/teacher';
import Student from '../screens/student';
import Loading from '../screens/loading';
import { View } from 'react-native';
import { checkLogin } from '../actions/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationService from './navigationService';
import { navigateTo } from '../actions/base';
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
});
const Container = createAppContainer(Nav);
export class App extends Component {
    componentWillReceiveProps(newProps) {
        if (newProps.navigateTo && this.props.navigateTo !== newProps.navigateTo) {
            NavigationService.navigate(newProps.navigateTo, newProps.params);
            this.props.navigate('');
        }
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Container, { ref: (navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                } })));
    }
}
function mapStateToProps(state) {
    // tslint:disable-next-line:no-shadowed-variable
    const { navigateTo, params } = state.base;
    return {
        navigateTo, params
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkLogin,
        navigate: navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=home.js.map