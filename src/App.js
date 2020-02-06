import React, { Component } from 'react'
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native'
import { ThemeProvider } from 'react-native-elements'
import { AppLoading, Font } from 'expo'
import Sentry from 'sentry-expo'
import { ApolloProvider } from 'react-apollo'

import theme from './config/theme'
import { client } from './graphql/apollo'
import { ME_QUERY } from './graphql/queries'
import AppNavigator from './config/navigation/AppNavigator'
import { cacheSetLoggedIn } from './graphql/cache'
import NavigationService from './utils/NavigationService'

Sentry.enableInExpoDevelopment = true
Sentry.config(
  'https://7fda1414f31540edb4cce8e26d979e9d@sentry.io/1396568'
).install()

class App extends Component {
  state = {
    isLoadingComplete: false,
  }

  async componentWillMount() {
    // await AsyncStorage.clear()
    this.loadAssets()
  }

  _handleLoadingError = error => console.warn(error)

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  initAuth = async () => {
    const token = await AsyncStorage.getItem('token')
    if (!token) return

    let meResult
    try {
      meResult = await client.query({ query: ME_QUERY })
    } catch (error) {
      return
    }

    if (!meResult.data || !meResult.data.me.id) return

    await cacheSetLoggedIn()
  }

  initFonts = () =>
    Font.loadAsync({
      OrfiIcons: require('./assets/fonts/OrfiIcons.ttf'),
      'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
      'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
      'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    })

  loadAssets = () => {
    const promsies = [this.initAuth(), this.initFonts()]

    return Promise.all(promsies)
  }

  render() {
    const { skipLoadingScreen } = this.props
    const { isLoadingComplete } = this.state

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <AppNavigator
              ref={navigatorRef =>
                NavigationService.setTopLevelNavigator(navigatorRef)
              }
            />
          </View>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default Expo.registerRootComponent(App)
