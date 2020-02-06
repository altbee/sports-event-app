import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import colors from '../../../assets/colors'

const SubTitle = ({ text, style }) => (
  <Text style={{ ...styles.text, ...style }}>{String(text).toUpperCase()}</Text>
)

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: colors.black1,
    marginBottom: 10,
    fontWeight: 'bold',
  },
})

SubTitle.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
}

SubTitle.defaultProps = {
  style: {},
}

export default SubTitle
