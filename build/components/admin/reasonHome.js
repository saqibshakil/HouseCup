import ReasonAdd from './reasonAdd';
import colors from '../../native-base-theme/variables/commonColor';
import List from './reasonList';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import IonIcons from 'react-native-ionicons';
const Nav = createStackNavigator({
    List: {
        screen: List
    },
    Detail: {
        screen: ReasonAdd
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
        const iconName = `information-circle`;
        return React.createElement(IonIcons, { name: iconName, size: 25, color: tintColor });
    },
    title: 'Reason'
};
export default Nav;
//# sourceMappingURL=reasonHome.js.map