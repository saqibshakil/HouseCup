import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Admin from '../screens/admin';
import PreLogin from '../screens/preLogin';
import Teacher from '../screens/teacher';
import Student from '../screens/student';
import Loading from '../screens/loading';
import { View } from 'react-native';
import commonColor from '../native-base-theme/variables/commonColor';
const Nav = createSwitchNavigator({
    Loading: {
        screen: Loading
    },
    Admin: {
        screen: Admin
    },
    PreLogin: {
        screen: PreLogin,
    },
    Teacher: {
        screen: Teacher
    },
    Student: {
        screen: Student
    }
}, {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: commonColor.btnPrimaryBg,
            color: commonColor.btnPrimaryColor
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});
const Container = createAppContainer(Nav);
export default class App extends Component {
    render() {
        return (React.createElement(View, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Container, null)));
    }
}
//# sourceMappingURL=home.js.map