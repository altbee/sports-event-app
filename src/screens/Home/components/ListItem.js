import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import colors from '../../../assets/colors'

const ListItem = ({
  avatar,
  fullName,
  address,
  distance,
  dateTime,
  onLayout,
}) => (
  <View style={styles.container} onLayout={onLayout}>
    <View style={styles.hr} />
    <View style={styles.content}>
      <Avatar size="medium" rounded source={{ uri: avatar }} />
      <View style={styles.section1}>
        <Text style={styles.nameText}>{fullName}</Text>
        <Text style={styles.locationText}>{address}</Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.distanceText}>{distance}mi</Text>
        <Text style={styles.dateTimeText}>{dateTime}</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  section1: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
    height: 50,
  },
  section2: {
    justifyContent: 'space-around',
    height: 50,
  },
  hr: {
    backgroundColor: colors.gray1,
    height: 1,
    marginLeft: 70,
    opacity: 0.2,
  },
  nameText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 12,
    color: colors.gray2,
  },
  distanceText: {
    fontSize: 12,
    color: colors.gray2,
    textAlign: 'right',
  },
  dateTimeText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
})

ListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
  onLayout: PropTypes.func,
}

ListItem.defaultProps = {
  onLayout: () => {},
}

export default ListItem
