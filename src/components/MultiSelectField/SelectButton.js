import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import colors from '../../assets/colors'

const SelectButton = ({
  selected,
  containerStyle,
  textStyle,
  buttonStyle,
  selectedButtonStyle,
  selectedTextStyle,
  onPress,
  title,
}) => (
  <Button
    containerStyle={containerStyle}
    buttonStyle={selected ? selectedButtonStyle : buttonStyle}
    titleStyle={selected ? selectedTextStyle : textStyle}
    title={title}
    onPress={onPress}
  />
)

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 4,
    marginBottom: 10,
    marginRight: 10,
  },
  button: {
    height: 32,
    borderRadius: 4,
    borderColor: colors.white4,
    borderWidth: 1,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
  },
  selectedButton: {
    height: 32,
    borderRadius: 4,
    borderColor: colors.pink1,
    borderWidth: 1,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.pink1,
  },
  text: {
    fontSize: 12,
    color: colors.black1,
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: 'bold',
  },
})

SelectButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  selectedButtonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  selectedTextStyle: PropTypes.object,
}

SelectButton.defaultProps = {
  containerStyle: styles.container,
  buttonStyle: styles.button,
  selectedButtonStyle: styles.selectedButton,
  textStyle: styles.text,
  selectedTextStyle: styles.selectedText,
}

export default SelectButton
