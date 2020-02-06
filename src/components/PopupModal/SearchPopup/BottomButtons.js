import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import colors from '../../../assets/colors'

const BottomButtons = ({ onSave, onSearch }) => (
  <View style={styles.container}>
    <Button
      title="Save"
      onPress={onSave}
      titleStyle={styles.title}
      containerStyle={styles.button}
      buttonStyle={styles.buttonSave}
    />
    <Button
      title="Search"
      onPress={onSearch}
      titleStyle={styles.title}
      containerStyle={styles.button}
      buttonStyle={styles.buttonSearch}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 14,
    color: colors.white,
  },
  buttonSearch: {
    height: 46,
    backgroundColor: colors.pink1,
  },
  buttonSave: {
    height: 46,
    backgroundColor: colors.black1,
  },
  button: {
    height: 46,
    borderRadius: 23,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
})

BottomButtons.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default BottomButtons
