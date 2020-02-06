import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, StyleSheet, SafeAreaView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import colors from '../../assets/colors'

const Popup = ({ visible, title, headerRightComponent, onClose, children }) => (
  <Modal visible={visible} animationType="none" onRequestClose={onClose}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          type="clear"
          onPress={onClose}
          icon={<AntDesign name="close" color={colors.black1} size={16} />}
        />
        <Text style={styles.title}>{title}</Text>
        {headerRightComponent === null ? (
          <View style={styles.tempView} />
        ) : (
          headerRightComponent
        )}
      </View>
      <View style={styles.hr} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  </Modal>
)

Popup.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  headerRightComponent: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

Popup.defaultProps = {
  headerRightComponent: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: getBottomSpace(),
  },
  content: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: colors.black1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tempView: {
    width: 30,
  },
  hr: {
    backgroundColor: colors.gray1,
    height: 1,
    opacity: 0.3,
  },
})

export default Popup
