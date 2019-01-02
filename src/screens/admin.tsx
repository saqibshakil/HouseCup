import Home from '../components/teacher/awardHome';
import TeacherHome from '../components/admin/teacherHome'
import HouseHome from '../components/admin/houseHome'
import ReasonHome from '../components/admin/reasonHome'
import { createBottomTabNavigator } from 'react-navigation';

export default createBottomTabNavigator(
  {
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
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  } as any)
