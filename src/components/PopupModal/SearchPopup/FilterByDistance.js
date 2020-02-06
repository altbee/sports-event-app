import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import SubTitle from './SubTitle'
import colors from '../../../assets/colors'

const { width } = Dimensions.get('screen')

class FilterByDistance extends Component {
  multiSliderValuesChange = values => {
    const { updateSearchFields } = this.props
    updateSearchFields({
      minDistance: values[0],
      maxDistance: values[1],
    })
  }

  sliderMarker = value => (
    <View style={styles.markerContainer}>
      <View style={styles.markerTextContainer}>
        <Text style={styles.markerText}>{value}mi</Text>
        <View style={styles.triangleContainer}>
          <View style={styles.triangle} />
        </View>
      </View>
      <View style={styles.sliderMarker} />
    </View>
  )

  sliderLeftMarker = () => {
    const { min } = this.props
    return this.sliderMarker(min)
  }

  sliderRightMarker = () => {
    const { max } = this.props
    return this.sliderMarker(max)
  }

  render() {
    const { min, max, minValue, maxValue } = this.props
    const multiSliderValue = [min, max]
    return (
      <View>
        <SubTitle text="filter by distance" />
        <MultiSlider
          values={[multiSliderValue[0], multiSliderValue[1]]}
          sliderLength={width - 70}
          onValuesChange={this.multiSliderValuesChange}
          min={minValue}
          max={maxValue}
          step={1}
          isMarkersSeparated
          containerStyle={styles.sliderContainer}
          trackStyle={styles.sliderTrack}
          selectedStyle={styles.sliderTrackSelected}
          customMarkerLeft={this.sliderLeftMarker}
          customMarkerRight={this.sliderRightMarker}
        />
        <View style={{ ...styles.sliderContainer, ...styles.minMaxContainer }}>
          <Text style={styles.minMaxText}>Min</Text>
          <Text style={styles.minMaxText}>Max</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  minMaxContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  minMaxText: {
    fontSize: 12,
    color: colors.black1,
  },
  sliderContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  sliderMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.black1,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white1,
  },
  sliderTrackSelected: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pink1,
  },
  markerText: {
    fontSize: 10,
    color: colors.black1,
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 33,
  },
  markerTextContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.white3,
    borderRadius: 4,
    padding: 7,
    position: 'relative',
  },
  triangleContainer: {
    position: 'absolute',
    bottom: -3,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 6,
    height: 6,
    borderColor: colors.white3,
    transform: [{ rotate: '45deg' }],
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
})

FilterByDistance.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  updateSearchFields: PropTypes.func.isRequired,
}

FilterByDistance.defaultProps = {
  min: 5,
  max: 90,
  minValue: 0,
  maxValue: 100,
}

export default FilterByDistance
