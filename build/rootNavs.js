import { createSwitchNavigator } from 'react-navigation';
import Admin from './screens/admin';
import PreLogin from './screens/preLogin';
import Teacher from './screens/teacher';
import Student from './screens/student';
import Loading from './screens/loading';
export const Container = createSwitchNavigator({
    Loading: {
        screen: Loading
    },
    Admin: {
        screen: Admin
    },
    PreLogin: {
        screen: PreLogin
    },
    Teacher: {
        screen: Teacher
    },
    Student: {
        screen: Student
    }
}, {
    initialRouteName: 'Loading'
});
//# sourceMappingURL=rootNavs.js.map