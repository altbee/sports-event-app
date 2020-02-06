import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, ListItem, Text } from 'react-native-elements'
import { compose, graphql } from 'react-apollo'
import {
  branch, hoistStatics, renderComponent, renderNothing,
} from 'recompose'

import { CACHE_AUTH_QUERY, ME_QUERY } from '../graphql/queries'
import AuthCallToAction from '../components/AuthCallToAction'
import ConfirmDialog from '../components/ConfirmDialog'

import { cacheSetLoggedOut } from '../graphql/cache'
import { removeToken } from '../utils/auth'

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'ORFI Active',
  }

  state = {
    isLogOutDialogVisable: false,
  }

  menuOptions = [
    {
      title: 'Log Out',
      icon: 'av-timer',
      key: 'logout',
      onPress: () => this.toggleLogOutDialog(),
    },
  ]

  constructor(props) {
    super(props)

    const { navigation } = props
    navigation.setParams({
      toggleLogOutDialog: this.toggleLogOutDialog,
    })
  }

  toggleLogOutDialog = () => {
    const { isLogOutDialogVisable } = this.state
    this.setState({
      isLogOutDialogVisable: !isLogOutDialogVisable,
    })
  }

  renderLogOutDialog() {
    const { isLogOutDialogVisable } = this.state
    const { navigation } = this.props

    return (
      <ConfirmDialog
        message="HMmmm?"
        negativeButton={{
          title: 'Cancel',
          onPress: () => this.toggleLogOutDialog(),
        }}
        positiveButton={{
          title: 'Log Out',
          onPress: async () => {
            this.toggleLogOutDialog()

            await cacheSetLoggedOut()
            await removeToken()

            navigation.navigate('HomeScreen')
          },
        }}
        visible={isLogOutDialogVisable}
      />
    )
  }

  render() {
    const { meQuery } = this.props
    const { me } = meQuery

    return (
      <View style={styles.container}>
        {this.renderLogOutDialog()}

        <Avatar
          rounded
          title={me.name.match(/\b(\w)/g).join('')}
          size="large"
        />
        <Text>{me.name}</Text>
        <Text>{me.dob}</Text>

        <View style={{ flex: 1 }}>
          <FlatList
            data={this.menuOptions}
            renderItem={({
              item: {
                key, title, icon, onPress,
              },
            }) => (
              <ListItem
                key={key}
                onPress={onPress}
                title={title}
                leftIcon={{ name: icon }}
                chevron
                bottomDivider
              />
            )}
          />
        </View>
      </View>
    )
  }
}

const NoAuthScreen = () => (
  <AuthCallToAction
    icon="smiley"
    title="Come on now..."
    text="Of course you need to login to see your profile!"
  />
)

const renderWhileNoAuth = () => branch(
  props => !props.authQuery.auth.status,
  renderComponent(() => <NoAuthScreen />),
)

const renderNoData = () => branch(
  props => !props.meQuery || !props.meQuery.me,
  renderNothing,
)

const styles = {
  container: {
    flex: 1,
  },
}

const enhancedComponent = compose(
  graphql(CACHE_AUTH_QUERY, {
    name: 'authQuery',
  }),
  graphql(ME_QUERY, {
    name: 'meQuery',
    skip: ({ authQuery }) => !authQuery.auth.status,
  }),
  renderWhileNoAuth(),
  renderNoData(),
)

export default hoistStatics(enhancedComponent)(ProfileScreen)
