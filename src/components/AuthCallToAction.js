import React, { Component } from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { Button, Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import OrfiIcon from './OrfiIcon'

class AuthCallToActionScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  navigateToSignUp = () => this.props.navigation.navigate('AuthScreen', { screenCategory: 1 })

  navigateToLogIn = () =>  this.props.navigation.navigate('AuthScreen', { screenCategory: 0 })

  render() {
    const { icon, title, text } = this.props

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.textContainer}>
          <OrfiIcon
            name={icon}
            size={48}
            style={styles.iconContainerStyle}
            color="#ffffff"
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            type="solid"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            title={'Log In'}
            onPress={this.navigateToLogIn}
          />
          <Text style={styles.signUpText}>Don't you an account?</Text>
          <Button
            type="outline"
            buttonStyle={styles.outlineButton}
            titleStyle={styles.outlineButtonTitle}
            title={'Sign Up'}
            onPress={this.navigateToSignUp}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#505258',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: '10%',
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: '10%',
  },

  button: {
    backgroundColor: '#ffffff',
  },
  buttonTitle: {
    color: '#505258',
  },

  outlineButton: {
    borderColor: '#ffffff',
  },
  outlineButtonTitle: {
    color: '#ffffff',
  },

  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 20,
  },
  signUpText: {
    color: '#ffffff',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  iconContainerStyle: {
    marginBottom: -3,
    paddingBottom: 20,
    alignSelf: 'center',
  },
})

export default withNavigation(AuthCallToActionScreen)
