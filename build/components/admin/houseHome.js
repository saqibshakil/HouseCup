import HouseAdd from './houseAdd';
import colors from '../../native-base-theme/variables/commonColor';
import List from './houseList';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import IonIcons from 'react-native-ionicons';
const Nav = createStackNavigator({
    List: {
        screen: List
    },
    Detail: {
        screen: HouseAdd
    }
}, {
    title: 'House',
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
        const iconName = `home`;
        return React.createElement(IonIcons, { name: iconName, size: 25, color: tintColor });
    },
    title: 'House'
};
export default Nav;
//# sourceMappingURL=houseHome.js.map