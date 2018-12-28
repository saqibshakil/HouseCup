import HouseAdd from './houseAdd';
import colors from '../../native-base-theme/variables/commonColor';
import List from './houseList';
import { createStackNavigator } from 'react-navigation';
const Nav = createStackNavigator({
    List: {
        screen: List
    },
    Detail: {
        screen: HouseAdd
    }
}, {
    initialRouteName: 'List',
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: colors.brandPrimary, height: 0 },
        headerTitleStyle: { color: colors.btnPrimaryColor },
        headerBackTitleStyle: { color: colors.btnPrimaryColor },
        headerTintColor: '#fff'
    }
});
export default Nav;
//# sourceMappingURL=houseHome.js.map