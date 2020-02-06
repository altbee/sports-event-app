import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import MultiSelectField from '../../MultiSelectField'
import SubTitle from './SubTitle'
import colors from '../../../assets/colors'

const FilterByActivity = ({ data, onPressItem, onLoadMore }) => (
  <View style={styles.container}>
    <SubTitle text="filter by activity" />
    <MultiSelectField data={data} onPressItem={onPressItem} />
    <Button
      title="LOAD MORE"
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.button}
      titleStyle={styles.text}
      onPress={onLoadMore}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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

FilterByActivity.propTypes = {
  data: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
}

export default FilterByActivity
