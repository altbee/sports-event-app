import { StyleSheet } from 'react-native'

const colors = {
  primary: '#F91874',
  secondary: '#292C34',
  black: '#000',
  white: '#fff',
  grey0: '#0b0c0e',
  grey1: '#22242b',
  grey2: '#383c47',
  grey3: '#4f5464',
  grey4: '#656d80',
  grey5: '#7f869a',
  gray6: '#c7c8cc',
  greyOutline: '#b8bcc7',
  searchBg: '#ffffff',
  success: '#07CC0E',
}

const theme = {
  colors: {
    ...colors,
  },
  Button: {
    buttonStyle: {
      borderRadius: 50,
      height: 50,
    },
  },
  Input: {
    marginHorizontal: 0,
    padding: 0,

    containerStyle: {
      marginVertical: 12,
    },
    inputContainerStyle: {
      height: 50,
      marginVertical: 0,
      borderColor: colors.greyOutline,
    },
    inputStyle: {
      marginLeft: 10,
    },
    rightIconContainerStyle: {
      paddingRight: 10,
    },
    labelStyle: {
      textAlign: 'center',
      fontSize: 12,
    },
    keyboardAppearance: 'light',
    blurOnSubmit: false,
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: colors.primary,
    },
  },
}

export default theme
