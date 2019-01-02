import AdminSignUp from '../login/adminSignup';
import colors from '../../native-base-theme/variables/commonColor';
import List from './teacherList';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import IonIcons from 'react-native-ionicons';
const Nav = createStackNavigator({
    List: {
        screen: List
    },
    SignUp: {
        screen: AdminSignUp
    }
}, {
    initialRouteName: 'List',
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: colors.brandPrimary },
        headerTitleStyle: { color: colors.btnPrimaryColor },
        headerBackTitleStyle: { color: colors.btnPrimaryColor },
        headerTintColor: '#fff'
    }
});
Nav.navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
        const iconName = `school`;
        return React.createElement(IonIcons, { name: iconName, size: 25, color: tintColor });
    },
    title: 'Teacher'
};
export default Nav;
//# sourceMappingURL=teacherHome.js.map