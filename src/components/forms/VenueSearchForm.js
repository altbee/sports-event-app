import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Input, Text, Icon } from 'react-native-elements'

import theme from '../../config/theme'

const VenueSearchForm = ({ value, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Text style={styles.title}>VENUE SEARCH</Text>
      <Input
        leftIcon={
          <Icon
            name="magnifying-glass"
            type="entypo"
            size={16}
            color={theme.colors.black}
            containerStyle={value === '' ? styles.icon : {}}
          />
        }
        placeholder="Try ‘Manchester M3 3EE’"
        value={value}
        editable={false}
        pointerEvents="none"
        inputStyle={value === '' ? styles.inputText : styles.inputTextActive}
        placeholderTextColor={theme.colors.black}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        leftIconContainerStyle={{ marginLeft: 0 }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: theme.colors.greyOutline,
  },
  inputText: {
    color: theme.colors.black,
    opacity: 0.5,
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 0,
  },
  inputTextActive: {
    color: theme.colors.black,
    fontSize: 14,
  },
  icon: {
    opacity: 0.5,
    marginLeft: 0,
  },
  inputContainer: {
    height: 28,
  },
})

VenueSearchForm.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default VenueSearchForm
