import Home from '../components/login/home';
import Login from '../components/login/login'
import SchoolSignUp from '../components/login/schoolSignUp'
import AdminSignUp from '../components/login/adminSignup'
import TeacherSignUp from '../components/login/teacherSignUp'
import colors from '../native-base-theme/variables/commonColor'
import IonIcons from 'react-native-ionicons'
import React from 'react';
import { Text } from 'native-base'
import TeacherHome from '../components/admin/teacherHome'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

export default createMaterialTopTabNavigator(
  {
    Award: {
      screen: Home
    },
    TeacherList: {
      screen: TeacherHome
    },
    HouseList: {
      screen: SchoolSignUp
    },
    ReasonList: {
      screen: AdminSignUp
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <IonIcons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  } as any)
