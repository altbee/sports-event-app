import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import Switch from 'react-native-switch-pro'

import theme from '../../config/theme'

const AcceptCashForm = ({ accepted, onChange }) => (
  <View style={styles.container}>
    <Switch
      value={accepted}
      onSyncPress={() => {
        onChange(!accepted)
      }}
    />
    <Text style={styles.title}>Accept cash payments</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
})

AcceptCashForm.propTypes = {
  accepted: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AcceptCashForm
