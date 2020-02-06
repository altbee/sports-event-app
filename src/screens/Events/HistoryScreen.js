import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { compose, graphql } from 'react-apollo'
import { branch, hoistStatics, renderComponent, renderNothing } from 'recompose'
import { MyEventsStack } from '../../config/navigation/MainTabNavigator'

import { CACHE_AUTH_QUERY, ME_QUERY } from '../../graphql/queries'
import AuthCallToAction from '../../components/AuthCallToAction'

class HistoryScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  goToCreateEvent = () => {
    const { navigation } = this.props
    MyEventsStack.navigationOptions = {
      tabBarVisible: false,
    }
    navigation.navigate('CreateEventScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.goToCreateEvent()}
            icon={{ color: '#FFFFFF', name: 'plus', type: 'feather' }}
            rounded
            raised
          />
        </View>
        <Text>History Screen</Text>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
}

const renderWhileNoAuth = () =>
  branch(
    props => !props.authQuery.auth.status,
    renderComponent(() => <NoAuthScreen />)
  )

const renderNoData = () =>
  branch(props => !props.meQuery || !props.meQuery.me, renderNothing)

const NoAuthScreen = () => (
  <AuthCallToAction
    icon="whistle"
    title="Slow down!"
    text="'You need to login to access and create events."
  />
)

const enhancedComponent = compose(
  graphql(CACHE_AUTH_QUERY, {
    name: 'authQuery',
  }),
  graphql(ME_QUERY, {
    name: 'meQuery',
    skip: ({ authQuery }) => !authQuery.auth.status,
  }),
  renderWhileNoAuth(),
  renderNoData()
)

export default hoistStatics(enhancedComponent)(HistoryScreen)
