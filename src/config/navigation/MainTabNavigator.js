import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import theme from '../theme'
import CreateEventScreen from '../../screens/Events/CreateEventScreen'
import SelectActivityScreen from '../../screens/Events/SelectActivityScreen'
import SelectDateScreen from '../../screens/Events/SelectDateScreen'
import SelectVenueScreen from '../../screens/Events/SelectVenueScreen'
import HomeScreen from '../../screens/Home/HomeScreen'
import NewsScreen from '../../screens/News/NewsScreen'
import NewsDetailScreen from '../../screens/News/NewsDetailScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import TabBarIcon from '../../components/TabBarIcon'
import MyEventsTabNavigator from './MyEventsTabNavigator'

const HomeStack = createStackNavigator({
  HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: props => <TabBarIcon name="binoculars" {...props} />,
}

const NewsStack = createStackNavigator({
  NewsScreen,
  NewsDetailScreen,
})

NewsStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: props => <TabBarIcon name="newspaper" {...props} />,
}

export const MyEventsStack = createStackNavigator({
  MyEventsTabNavigator,
  CreateEventScreen,
  SelectActivityScreen,
  SelectDateScreen,
  SelectVenueScreen,
})

MyEventsStack.navigationOptions = {
  tabBarLabel: 'My Events',
  tabBarIcon: props => <TabBarIcon name="running" {...props} />,
  title: 'My Events',
}

const ProfileStack = createStackNavigator({
  ProfileScreen,
})

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: props => <TabBarIcon name="user" {...props} />,
}

export default createBottomTabNavigator(
  {
    HomeStack,
    NewsStack,
    MyEventsStack,
    ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.grey0,
    },
  }
)

// export default class MainTabNavigator extends React.Component {
//   static router = TabsNav.router
//   render() {
//     setBottomTabNavigator(this.props.navigation)
//     return <TabsNav navigation={this.props.navigation} />
//   }
// }
