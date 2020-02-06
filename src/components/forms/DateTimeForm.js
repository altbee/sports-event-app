import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-elements'

import theme from '../../config/theme'
import { dateStringToDMMYYYY } from '../../utils/convert'

const DateTimeForm = ({ events, onSelect }) => {
  let buttonTitleStyle = styles.buttonText
  let buttonStyle = styles.button
  let buttonText = 'Select...'
  if (events.length > 0) {
    buttonTitleStyle = { ...buttonTitleStyle, color: theme.colors.primary }
    buttonStyle = { ...buttonStyle, backgroundColor: theme.colors.white }
    buttonText = dateStringToDMMYYYY(events[0].date)
    if (events.length > 1) {
      buttonText = `${buttonText} - ${dateStringToDMMYYYY(
        events[events.length - 1].date
      )}`
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVENT DATES AND TIMES</Text>
      <Button
        title={buttonText}
        containerStyle={styles.buttonContainer}
        titleStyle={buttonTitleStyle}
        buttonStyle={buttonStyle}
        onPress={onSelect}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    height: 46,
    width: '80%',
    borderRadius: 23,
    padding: 0,
    marginTop: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: 14,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  button: {
    height: 46,
    borderRadius: 23,
    padding: 0,
    backgroundColor: theme.colors.secondary,
  },
})

DateTimeForm.propTypes = {
  events: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default DateTimeForm
