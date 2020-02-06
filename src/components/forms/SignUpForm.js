import React, { Component } from 'react'
import {
  AsyncStorage, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet,
} from 'react-native'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Input, ThemeProvider } from 'react-native-elements'
import { graphql, compose, withApollo } from 'react-apollo'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'

import theme from '../../config/theme'
import { SIGNUP_MUTATION } from '../../graphql/mutations'
import GradientButton from '../gradientButton'

class SignUpForm extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }

  state = {
    securePassword: true,
    isDateTimePickerVisible: false,
  }

  toggleSecurePassword = () => {
    const { securePassword } = this.state
    this.setState({ securePassword: !securePassword })
  }

  toggleDobPicker = () => {
    const { isDateTimePickerVisible } = this.state
    this.setState({ isDateTimePickerVisible: !isDateTimePickerVisible })
  }

  handleDatePicked = (date) => {
    const { setFieldValue } = this.props
    setFieldValue('dob', date.toISOString().split('T')[0])
    this.toggleDobPicker()
  }

  handlePickerGender = (value) => {
    const { setFieldValue } = this.props
    setFieldValue('gender', value)
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
      isDateTimePickerVisible,
      securePassword,
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <KeyboardAvoidingView>
          {errors.form && <Text>{errors.form}</Text>}

          <Input
            placeholder="Name"
            value={values.name}
            onBlur={() => setFieldTouched('name')}
            onChangeText={handleChange('name')}
            errorMessage={touched.name && errors.name ? errors.name : undefined}
            editable={!isSubmitting}
            leftIcon={{
              type: 'material-community',
              name: 'account',
            }}
          />
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

          <RNPickerSelect
            placeholder={{}}
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            onValueChange={itemValue => this.handlePickerGender(itemValue)}
          >
            <Input
              placeholder="Gender"
              value={values.gender}
              onBlur={() => setFieldTouched('gender')}
              onChangeText={handleChange('gender')}
              errorMessage={touched.gender && errors.gender ? errors.gender : undefined}
              editable={false}
              leftIcon={{
                type: 'material-community',
                name: 'gender-male-female',
              }}
              rightIcon={{
                type: 'material-community',
                name: 'menu-down',
              }}
            />
          </RNPickerSelect>

          <TouchableOpacity onPress={this.toggleDobPicker}>
            <Input
              placeholder="Date of Birth"
              value={moment(values.dob).format('MMMM Do YYYY')}
              onBlur={() => setFieldTouched('dob')}
              onChangeText={handleChange('dob')}
              errorMessage={touched.dob && errors.dob ? errors.dob : undefined}
              editable={false}
              pointerEvents="none"
              leftIcon={{
                type: 'material-community',
                name: 'calendar',
              }}
            />
          </TouchableOpacity>

          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.toggleDobPicker}
            selectedValue={values.gender}
          />

          <GradientButton
            title="Sign Up"
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
  name: Yup.string()
    .required('Name is required!'),
  email: Yup.string()
    .email('E-mail is not valid!')
    .required('E-mail is required!'),
  password: Yup.string()
    .min(8, 'Password has to be longer than 8 characters!')
    .required('Password is required!'),
  gender: Yup.string()
    .required('Gender is required!'),
  dob: Yup.date()
    .required('Date of birth is required!'),
})

export default compose(
  withNavigation,
  withApollo,
  graphql(SIGNUP_MUTATION, {
    name: 'signupMutation',
    options: {
      update: (cache) => {
        cache.writeData({
          data: {
            auth: {
              __typename: 'auth',
              status: true,
            },
          },
        })
      },
    },
  }),
  withFormik({
    mapPropsToValues: () => ({
      name: 'Lee Solway',
      email: 'solway@outlook.com',
      password: '12345678',
      gender: '',
      dob: '1985-11-11',
    }),
    handleSubmit: async (values, { props, setSubmitting, setFieldError }) => {
      const { navigation } = props
      const {
        name, email, password, gender, dob,
      } = values

      await props.signupMutation({
        variables: {
          name,
          email,
          password,
          gender,
          dob,
        },
      })
        .then(async (result) => {
          const { token } = result.data.createUser

          await AsyncStorage.setItem('token', token)
          setSubmitting(false)
          navigation.goBack()
        })
        .catch((e) => {
          setFieldError('form', e.message)
          setSubmitting(false)
        })
    },
    validationSchema,
  })
)(SignUpForm)

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
})
