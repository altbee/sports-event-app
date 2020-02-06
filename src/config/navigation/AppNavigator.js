import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import AuthScreen from '../../screens/auth/AuthScreen'
import MainTabNavigator from './MainTabNavigator'

export default createAppContainer(
  createStackNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      MainTabNavigator,
      AuthScreen,
    },
    {
      initialRouteName: 'MainTabNavigator',
      headerMode: 'none',
    }
  )
)
