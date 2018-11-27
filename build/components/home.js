import React, { Component } from 'react';
import { createSwitchNavigator, createNavigationContainer } from 'react-navigation';
import Admin from '../screens/admin';
import PreLogin from '../screens/preLogin';
import Teacher from '../screens/teacher';
import Student from '../screens/student';
import Loading from '../screens/loading';
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
const Container = createNavigationContainer(Nav);
export default class App extends Component {
    render() {
        return (React.createElement(Container, null));
    }
}
//# sourceMappingURL=home.js.map