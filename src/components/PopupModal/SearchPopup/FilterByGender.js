import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import MultiSelectField from '../../MultiSelectField'
import SubTitle from './SubTitle'
import colors from '../../../assets/colors'

const FilterByGender = ({ data, onPressItem }) => (
  <View style={styles.container}>
    <SubTitle text="filter by gender" />
    <MultiSelectField data={data} onPressItem={onPressItem} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  buttonContainer: {
    height: 28,
    borderRadius: 14,
    width: 100,
  },
  button: {
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink1,

    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
})

FilterByGender.propTypes = {
  data: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
}

export default FilterByGender
