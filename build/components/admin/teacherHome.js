import AdminSignUp from '../login/adminSignup';
import colors from '../../native-base-theme/variables/commonColor';
import List from './teacherList';
import { createStackNavigator } from 'react-navigation';
const Nav = createStackNavigator({
    List: {
        screen: List
    },
    SignUp: {
        screen: AdminSignUp
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
//# sourceMappingURL=teacherHome.js.map