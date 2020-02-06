import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import SelectButton from './SelectButton'

const MultiSelectField = ({ data, onPressItem }) => (
  <View style={styles.container}>
    {data.map((item, index) => (
      <SelectButton
        key={item.id}
        title={item.text}
        onPress={() => {
          onPressItem(index, !item.selected)
        }}
        selected={item.selected}
      />
    ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
})

MultiSelectField.propTypes = {
  data: PropTypes.array.isRequired,
  onPressItem: PropTypes.func.isRequired,
}

export default MultiSelectField
