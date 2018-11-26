import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Admin from '../screens/admin'
import PreLogin from '../screens/preLogin'
import Teacher from '../screens/teacher'
import Student from '../screens/student'

const Nav = createSwitchNavigator({
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
    initialRouteName: 'Teacher'
})
const Container = createAppContainer(Nav);
export default class App extends Component {
    render() {
      return (
          <Container/>
      );
    }
  }
  