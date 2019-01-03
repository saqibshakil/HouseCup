import colors from '../../native-base-theme/variables/commonColor'
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import IonIcons from 'react-native-ionicons'
import Home from './home'
import ScanStudent from './scanStudent';
import StudentAdd from './studentAdd';
const Nav = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        ScanStudent: {
            screen: ScanStudent
        },
        AddStudent: {
            screen: StudentAdd
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
    Nav.navigationOptions = {
        tabBarIcon: ({ tintColor }: any) => {
            const iconName = `color-wand`;
            return <IonIcons name={iconName} size={25} color={tintColor} />;
        },
        title: 'Award'
    }
export default Nav