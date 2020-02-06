import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Badge, Icon } from 'react-native-elements'
import colors from '../../assets/colors'

const renderIcon = (name, color, size) => {
  switch (name) {
    case 'star':
    case 'angle-double-down':
      return <Icon name={name} type="font-awesome" color={color} size={size} />
    case 'close':
      return <Icon name={name} type="antdesign" color={color} size={size} />

    case 'magnifying-glass':
      return <Icon name={name} type="entypo" color={color} size={size} />
    case 'plus':
      return <Icon name={name} type="antdesign" color={color} size={size} />

    default:
      return <Icon name={name} type="fontawesome" color={color} size={size} />
  }
}

const IconButton = ({ name, color, onClick, style, badge, size }) => (
  <TouchableOpacity style={{ ...styles.container, ...style }} onPress={onClick}>
    {renderIcon(name, color, size)}
    {badge && (
      <Badge
        status="primary"
        containerStyle={styles.badge}
        badgeStyle={styles.badgeInner}
      />
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.white,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    backgroundColor: colors.pink1,
    width: 10,
    height: 10,
    borderRadius: 5,
    top: 0,
    right: 0,
  },
  badgeInner: {
    backgroundColor: colors.pink1,
    borderWidth: 0,
  },
})

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.object,
  badge: PropTypes.bool,
  size: PropTypes.number,
}

IconButton.defaultProps = {
  color: colors.black1,
  style: {},
  badge: false,
  onClick: () => {},
  size: 13,
}

export default IconButton
