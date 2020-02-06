import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

import SubTitle from './SubTitle'
import colors from '../../../assets/colors'

const FilterByDateTime = ({ startDate, endDate, time }) => (
  <View style={styles.container}>
    <SubTitle text="filter by date and time" />
    <View style={styles.buttons}>
      <Button
        title={`${startDate} - ${endDate}`}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.text}
      />
      <View style={styles.spacer} />
      <Button
        title={time}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        titleStyle={styles.text}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonContainer: {
    borderRadius: 23,
    height: 46,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    elevation: 4,
    shadowOpacity: 0.2,
    flex: 1,
  },
  button: {
    width: '100%',
    borderRadius: 23,
    height: 46,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  spacer: {
    width: 25,
  },
  text: {
    color: colors.black1,
    fontSize: 14,
  },
})

FilterByDateTime.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
}

export default FilterByDateTime
