import colors from '../../native-base-theme/variables/commonColor';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import IonIcons from 'react-native-ionicons';
import Home from './home';
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
});
Nav.navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
        const iconName = `color-wand`;
        return React.createElement(IonIcons, { name: iconName, size: 25, color: tintColor });
    },
    title: 'Award'
};
export default Nav;
//# sourceMappingURL=awardHome.js.map