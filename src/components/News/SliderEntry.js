import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import striptags from 'striptags'
import { withNavigation } from 'react-navigation'

import styles from './SliderEntry.style'

class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  }

  get image() {
    const { data: { urlToImage }, parallaxProps, even } = this.props

    return (
      <ParallaxImage
        source={{ uri: urlToImage }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    )
  }

  render() {
    const { data, navigation } = this.props
    const { title, description } = data

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title]}
        numberOfLines={2}
      >
        { title.toUpperCase() }
      </Text>
    ) : false

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => navigation.navigate('NewsDetailScreen', { article: data })}
      >
        <View style={[styles.imageContainer]}>
          { this.image }
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}

          <Text
            style={[styles.subtitle]}
            numberOfLines={2}
          >
            {striptags(description)}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(SliderEntry)
