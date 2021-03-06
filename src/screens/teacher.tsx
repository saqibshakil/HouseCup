import React from 'react';
import Home from '../components/teacher/home'
import colors from '../native-base-theme/variables/commonColor'

import { createStackNavigator } from 'react-navigation';
import { Text } from 'native-base'

const Nav = createStackNavigator({
  Home: {
    screen: Home
  }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: colors.brandPrimary },
    headerTitleStyle: { color: colors.btnPrimaryColor },
    headerBackTitleStyle: { color: colors.btnPrimaryColor },
    headerTintColor: '#fff'
  }
} as any)

Nav.navigationOptions = () => {
  return {
    // headerBackImage: params.headerBackImage,
    headerTitle: <Text style={{ color: 'black' }}>Welcome</Text>
    // Render a button on the right side of the header.
    // When pressed switches the screen to edit mode.
  };
};

export default Nav