import Home from '../components/login/home';
import Login from '../components/login/login'
import SchoolSignUp from '../components/login/schoolSignUp'
import AdminSignUp from '../components/login/adminSignup'
import { createStackNavigator, Header } from 'react-navigation';
import React from 'react';
import { Text } from 'native-base'
import { NavigationContainerProps } from 'react-navigation';
const Nav = createStackNavigator(
	{
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
		}
	}, {
		initialRouteName: 'PreLoginHome'
  })
  
  Nav.navigationOptions = (props: NavigationContainerProps) => {
    return {
      // headerBackImage: params.headerBackImage,
      headerTitle: <Text style={{color: 'black'}}>Welcome</Text>,
      // Render a button on the right side of the header.
      // When pressed switches the screen to edit mode.
    };
  };

export default Nav