import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Admin from '../screens/admin';
import PreLogin from '../screens/preLogin';
import Teacher from '../screens/teacher';
import Student from '../screens/student';
import Loading from '../screens/loading';
import { View, BackHandler } from 'react-native';
import { checkLogin } from '../actions/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationService from './navigationService';
import { navigateTo, back } from '../actions/base';
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
    constructor() {
        super(...arguments);
        this.handleBackButton = () => {
            this.props.back();
            return true;
        };
    }
    componentWillReceiveProps(newProps) {
        // tslint:disable-next-line:no-shadowed-variable
        const base = newProps.base;
        if (this.props.base !== base) {
            if (base.navigateTo)
                NavigationService.navigate(base.navigateTo, base.params);
            if (base.back)
                NavigationService.back();
            if (base.popToTop)
                NavigationService.back();
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
    return {
        base: state.base
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkLogin,
        back,
        navigate: navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=home.js.map