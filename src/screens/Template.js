import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import NavigationType from '../config/navigation/propTypes'


class SelectActivityScreen extends Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SelectActivityScreen
