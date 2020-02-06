import React from 'react'
import PropTypes from 'prop-types'

import OrfiIcon from './OrfiIcon'

const TabBarIcon = ({ name, tintColor }) => (
  <OrfiIcon
    name={name}
    size={18}
    style={{ marginBottom: -3 }}
    color={tintColor}
  />
)

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
}

export default TabBarIcon
