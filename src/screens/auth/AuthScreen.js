import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  LayoutAnimation,
  ImageBackground,
  StatusBar,
} from 'react-native'
import { Button } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation-stack'

import LogInForm from '../../components/forms/LogInForm'
import SignUpForm from '../../components/forms/SignUpForm'
import { scaleVertical } from '../../utils/scale'
import {
  IMAGE_LOGO_LIGHT_ALT,
  IMAGE_AUTH_BACKGROUND,
} from '../../assets/images'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedCategory: this.props.navigation.getParam('screenCategory', 0),
      isLoading: false,
    }
  }

  selectCategory = (selectedCategory) => {
    LayoutAnimation.easeInEaseOut()

    this.setState({
      selectedCategory,
      isLoading: false,
    })
  }

  navigateBack = () => this.props.navigation.goBack()
  onSignUpButtonPressed = () => this.props.navigation.navigate('SignUp')

  render = () => {
    const { selectedCategory } = this.state

    const isLoginPage = selectedCategory === 0
    const isSignUpPage = selectedCategory === 1

    const Form = isLoginPage ? LogInForm : SignUpForm

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={IMAGE_AUTH_BACKGROUND} style={styles.bg}>
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <HeaderBackButton tintColor="#ffffff" onPress={this.navigateBack} />

            <View style={styles.logoContainer}>
              <Image style={styles.image} source={IMAGE_LOGO_LIGHT_ALT} />
            </View>
            <View style={styles.categorySelectorContainer}>
              <Button
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(0)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isLoginPage && styles.selectedCategoryText,
                ]}
                title={'Log In'}
              />
              <Button
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(1)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isSignUpPage && styles.selectedCategoryText,
                ]}
                title={'Sign Up'}
              />
            </View>
            <View style={styles.formContainer}>
              <Form />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: scaleVertical(50),
    resizeMode: 'contain',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: scaleVertical(150),
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 60,
    borderRadius: 10,
    padding: 8,
  },
  bg: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  categorySelectorContainer: {
    width: SCREEN_WIDTH - 60,
    flexDirection: 'row',
  },
})

export default AuthScreen
