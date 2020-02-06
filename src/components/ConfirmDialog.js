import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'

class ConfirmDialog extends Component {
  renderMessage() {
    const { title, message } = this.props

    return (
      <View style={styles.contentContainer}>
        <Text h4>{title}</Text>
        <Text>{message}</Text>
      </View>
    )
  }

  renderButtons() {
    const { negativeButton, positiveButton } = this.props

    return (
      <View style={styles.buttonContainer}>
        <Button type="clear" {...negativeButton} />
        <Button type="clear" {...positiveButton} />
      </View>
    )
  }

  renderContent() {
    const { children } = this.props

    if (children) return children
    return this.renderMessage()
  }

  render() {
    const { visible } = this.props

    return (
      <Modal isVisible={visible}>
        <View style={styles.container}>
          {this.renderContent()}
          {this.renderButtons()}
        </View>
      </Modal>
    )
  }
}

const buttonPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
})

ConfirmDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  negativeButton: buttonPropType.isRequired,
  positiveButton: buttonPropType.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },

  contentContainer: {
    margin: 24,
    marginBottom: 12,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 6,
    marginHorizontal: 12,
  },

  messageText: {
    fontSize: 18,
  },
})

export default ConfirmDialog
