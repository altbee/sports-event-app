import React, { Component } from 'react'
import {
  Text, KeyboardAvoidingView, StyleSheet,
} from 'react-native'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Input, ThemeProvider } from 'react-native-elements'
import { graphql, compose, withApollo } from 'react-apollo'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { LOGIN_MUTATION } from '../../graphql/mutations'

import theme from '../../config/theme'
import GradientButton from '../gradientButton'
import { setToken } from '../../utils/auth'

class LogInForm extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }

  state = {
    securePassword: true,
  }

  toggleSecurePassword = () => {
    const { securePassword } = this.state
    this.setState({ securePassword: !securePassword })
  }

  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit,
      setFieldTouched,
    } = this.props

    const {
      securePassword,
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView>
          {errors.form && <Text>{errors.form}</Text>}

          <Input
            placeholder="Email"
            value={values.email}
            onBlur={() => setFieldTouched('email')}
            onChangeText={handleChange('email')}
            errorMessage={touched.email && errors.email ? errors.email : undefined}
            editable={!isSubmitting}
            leftIcon={{
              type: 'material-community',
              name: 'email',
            }}
          />
          <Input
            placeholder="Password"
            value={values.password}
            onBlur={() => setFieldTouched('password')}
            onChangeText={handleChange('password')}
            errorMessage={touched.password && errors.password ? errors.password : undefined}
            editable={!isSubmitting}
            secureTextEntry={securePassword}
            leftIcon={{
              type: 'material-community',
              name: 'lock',
            }}
            rightIcon={{
              type: 'material-community',
              name: securePassword ? 'eye-outline' : 'eye-off-outline',
              onPress: this.toggleSecurePassword,
            }}
          />

          <GradientButton
            title="Log In"
            onPress={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
            style={styles.button}
          />
        </KeyboardAvoidingView>
      </ThemeProvider>
    )
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password: Yup.string()
    .required('Password is required!'),
})

export default compose(
  withNavigation,
  withApollo,
  graphql(LOGIN_MUTATION, {
    name: 'loginMutation',
    options: {
      update: (cache, result) => {
        const token = result.data.loginUser.token

        return Promise.all([
          setToken(token),
          cache.writeData({
            data: {
              auth: {
                __typename: 'auth',
                status: true,
              },
            },
          }),
        ])
      },
    },
  }),
  withFormik({
    mapPropsToValues: () => ({
      email: 'solway@outlook.com',
      password: '12345678',
    }),
    handleSubmit: async (values, { props, setSubmitting, setFieldError }) => {
      const { email, password } = values
      const { navigation } = props

      try {
        await props.loginMutation({
          variables: {
            email,
            password,
          },
        })

        setSubmitting(false)
        navigation.goBack()
      } catch (e) {
        setFieldError('form', e.message)
        setSubmitting(false)
      }
    },
    validationSchema,
  })
)(LogInForm)

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
})
