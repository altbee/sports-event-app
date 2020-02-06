import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { BlurView } from 'expo'
import { AntDesign } from '@expo/vector-icons'

import colors from '../../../assets/colors'
import GradientButton from '../../gradientButton'

const SaveSearchPopup = ({ name, onUpdate, onSave, visible, onClose }) =>
  visible && (
    <View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView tint="dark" intensity={90} style={styles.blury}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>NAME YOUR SEARCH</Text>
                <Button
                  icon={
                    <AntDesign name="close" size={13} color={colors.black1} />
                  }
                  type="clear"
                  onPress={onClose}
                />
              </View>
              <Input
                value={name}
                placeholder='e.g "Football sessions near me"'
                onChangeText={text => {
                  onUpdate(text)
                }}
                inputStyle={[
                  styles.inputStyle,
                  name !== '' ? {} : styles.italic,
                ]}
                inputContainerStyle={styles.inputContainer}
              />
              <GradientButton onPress={onSave} title="Save" />
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </View>
  )

const styles = StyleSheet.create({
  container: {},
  blury: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '80%',
    borderRadius: 6,
    padding: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    backgroundColor: colors.white,
    marginTop: '20%',
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
  },
  title: {
    color: colors.black1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  italic: {
    fontStyle: 'italic',
  },
  inputStyle: {
    fontSize: 12,
    color: colors.black1,
    textAlignVertical: 'bottom',
  },
  inputContainer: {
    borderBottomColor: colors.white5,
  },
})

SaveSearchPopup.propTypes = {
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SaveSearchPopup
