import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import theme from '../theme'
import AttendingScreen from '../../screens/Events/AttendingScreen'
import OrganisedScreen from '../../screens/Events/OrganisedScreen'
import HistoryScreen from '../../screens/Events/HistoryScreen'

const AttendingStack = createStackNavigator({
  AttendingScreen,
})

AttendingStack.navigationOptions = {
  tabBarLabel: 'Attending',
}

const OrganisedStack = createStackNavigator({
  OrganisedScreen,
})

OrganisedStack.navigationOptions = {
  tabBarLabel: 'Organised',
}

const HistoryStack = createStackNavigator({
  HistoryScreen,
})

HistoryStack.navigationOptions = {
  tabBarLabel: 'History',

}

const Tabs = createMaterialTopTabNavigator({
  MyEventsAttendingScreen: AttendingStack,
  MyEventsOrganisedScreen: OrganisedStack,
  MyEventsHistoryScreen: HistoryStack,
}, {
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.grey0,
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
    },
    style: {
      backgroundColor: 'transparent',
    },
    indicatorStyle: {
      backgroundColor: theme.colors.primary,
    },
  },
})

Tabs.navigationOptions = {
  title: 'ORFI Active',
}

export default Tabs
