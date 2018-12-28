import Home from '../components/login/home';
import IonIcons from 'react-native-ionicons';
import React from 'react';
import TeacherHome from '../components/admin/teacherHome';
import HouseHome from '../components/admin/houseHome';
import ReasonHome from '../components/admin/reasonHome';
import { createBottomTabNavigator } from 'react-navigation';
export default createBottomTabNavigator({
    Reward: {
        screen: Home
    },
    TeacherList: {
        screen: TeacherHome
    },
    HouseList: {
        screen: HouseHome
    },
    ReasonList: {
        screen: ReasonHome
    }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            }
            else if (routeName === 'Settings') {
                iconName = `ios-options${focused ? '' : '-outline'}`;
            }
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return React.createElement(IonIcons, { name: iconName, size: horizontal ? 20 : 25, color: tintColor });
        }
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
    }
});
//# sourceMappingURL=admin.js.map