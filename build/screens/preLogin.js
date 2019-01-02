import Home from '../components/login/home';
import Login from '../components/login/login';
import SchoolSignUp from '../components/login/schoolSignUp';
import AdminSignUp from '../components/login/adminSignup';
import TeacherSignUp from '../components/login/teacherSignUp';
import colors from '../native-base-theme/variables/commonColor';
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
    initialRouteName: 'PreLoginHome',
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: colors.brandPrimary },
        headerTitleStyle: { color: colors.btnPrimaryColor },
        headerBackTitleStyle: { color: colors.btnPrimaryColor },
        headerTintColor: '#fff'
    }
});
Nav.navigationOptions = ({}) => {
    return {
        // headerBackImage: params.headerBackImage,
        headerTitle: React.createElement(Text, { style: { color: 'black' } }, "Welcome")
        // Render a button on the right side of the header.
        // When pressed switches the screen to edit mode.
    };
};
export default Nav;
//# sourceMappingURL=preLogin.js.map