import React from 'react'
import { Button } from 'react-native-elements'
import theme from '../../config/theme'

const GradientButton = props => (
  <Button
    ViewComponent={require('expo').LinearGradient}
    linearGradientProps={{
      colors: props.blackGradient
        ? [theme.colors.secondary, theme.colors.secondary]
        : ['#f91874', '#dc1e6c'],
      start: [1, 0],
      end: [0.2, 0],
    }}
    {...props}
  />
)

export default GradientButton
