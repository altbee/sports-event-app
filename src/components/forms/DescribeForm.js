import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'

import theme from '../../config/theme'

const DescribeForm = ({
  description,
  rules,
  additionalNotes,
  handleChange,
  touched,
  errors,
  setFieldTouched,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>DESCRIBE YOUR EVENT</Text>
    <Input
      value={description}
      placeholder="Description"
      onChangeText={handleChange('description')}
      containerStyle={styles.inputContainer}
      inputStyle={description === '' ? styles.input : styles.inputActive}
      inputContainerStyle={styles.inputContainer}
      onBlur={() => setFieldTouched('description')}
      errorMessage={
        touched.description && errors.description
          ? errors.description
          : undefined
      }
    />
    <Input
      value={rules}
      placeholder="Rules"
      onChangeText={handleChange('rules')}
      containerStyle={styles.inputContainer}
      inputStyle={rules === '' ? styles.input : styles.inputActive}
      inputContainerStyle={styles.inputContainer}
      onBlur={() => setFieldTouched('rules')}
      errorMessage={touched.rules && errors.rules ? errors.rules : undefined}
    />
    <Input
      value={additionalNotes}
      placeholder="Additional Notes"
      onChangeText={handleChange('additionalNotes')}
      containerStyle={styles.inputContainer}
      inputStyle={additionalNotes === '' ? styles.input : styles.inputActive}
      inputContainerStyle={styles.inputContainer}
      onBlur={() => setFieldTouched('additionalNotes')}
      errorMessage={
        touched.additionalNotes && errors.additionalNotes
          ? errors.additionalNotes
          : undefined
      }
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 0,
    marginTop: 15,
  },
  input: {
    fontSize: 14,
    color: theme.colors.black,
    opacity: 0.5,
    fontStyle: 'italic',
    marginLeft: 0,
  },
  inputActive: { fontSize: 14, color: theme.colors.secondary, marginLeft: 0 },
  inputContainer: { height: 28 },
})

DescribeForm.propTypes = {
  description: PropTypes.string.isRequired,
  rules: PropTypes.string.isRequired,
  additionalNotes: PropTypes.string.isRequired,
  onChangeField: PropTypes.func.isRequired,
}

export default DescribeForm
