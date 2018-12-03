import Home from '../components/login/home';
import Login from '../components/login/login';
import SchoolSignUp from '../components/login/schoolSignUp';
import AdminSignUp from '../components/login/adminSignup';
import TeacherSignUp from '../components/login/teacherSignUp';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { Text } from 'native-base';
const Nav = createStackNavigator({
    PreLoginHome: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    SchoolSignUp: {
        screen: SchoolSignUp
    },
    AdminSignUp: {
        screen: AdminSignUp
    },
    TeacherSignUp: {
        screen: TeacherSignUp
    }
}, {
    initialRouteName: 'PreLoginHome'
});
Nav.navigationOptions = (props) => {
    return {
        // headerBackImage: params.headerBackImage,
        headerTitle: React.createElement(Text, { style: { color: 'black' } }, "Welcome"),
    };
};
export default Nav;
//# sourceMappingURL=preLogin.js.map