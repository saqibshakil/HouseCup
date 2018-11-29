import React, { Component } from 'react';

import { createSwitchNavigator, createAppContainer, createNavigationContainer } from 'react-navigation'
import Admin from '../screens/admin'
import PreLogin from '../screens/preLogin'
import Teacher from '../screens/teacher'
import Student from '../screens/student'
import Loading from '../screens/loading'
import { View } from 'react-native';
import border from '../utils/addBorder'

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

    })

const Container = createAppContainer(Nav);
export default class App extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Container />
            </View>
        );
    }
}
