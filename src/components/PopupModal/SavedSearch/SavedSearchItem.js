import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import colors from '../../../assets/colors'

const SavedSearchItem = ({ title, onDelete }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Icon size={25} color={colors.black1} name="bookmark" type="feather" />
      <Text style={styles.title}>{title}</Text>
      <Button
        type="clear"
        title="Delete"
        onPress={onDelete}
        titleStyle={styles.buttonTitle}
      />
    </View>
    <View style={styles.hr} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  hr: {
    backgroundColor: colors.gray1,
    height: 1,
    marginLeft: 40,
    opacity: 0.3,
  },
  title: {
    fontSize: 14,
    flex: 1,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  buttonTitle: {
    color: colors.pink1,
    fontSize: 12,
  },
})

SavedSearchItem.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default SavedSearchItem
