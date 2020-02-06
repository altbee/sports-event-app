import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'
import { Text } from 'react-native-elements'

import theme from '../../config/theme'

const STEP_STATUS = {
  CURRENT: 'current',
  FINISHED: 'finished',
  UNFINISHED: 'unfinished',
}

class StepIndicator extends Component {
  static propTypes = {
    currentPosition: PropTypes.number,
    stepCount: PropTypes.number,
    labels: PropTypes.array,
    onPress: PropTypes.func,
    renderStepIndicator: PropTypes.func,
  }

  static defaultProps = {
    currentPosition: 0,
    stepCount: 5,
  }

  styleConfig = {
    stepIndicatorSize: 17,
    currentStepIndicatorSize: 26,
    separatorStrokeWidth: 3,
    separatorStrokeUnfinishedWidth: 0,
    separatorStrokeFinishedWidth: 0,
    currentStepStrokeWidth: 3,

    stepStrokeWidth: 0,
    stepStrokeCurrentColor: theme.colors.primary,
    stepStrokeFinishedColor: theme.colors.primary,
    stepStrokeUnFinishedColor: '#D4D4D7',
    separatorFinishedColor: theme.colors.primary,
    separatorUnFinishedColor: '#D4D4D7',
    stepIndicatorFinishedColor: theme.colors.primary,
    stepIndicatorUnFinishedColor: '#D4D4D7',
    stepIndicatorCurrentColor: theme.colors.primary,
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#D4D4D7',
    labelSize: 12,
    labelAlign: 'center',
    currentStepLabelColor: theme.colors.primary,
  }

  constructor(props) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
      progressBarSize: 0,
    }

    this.progressAnim = new Animated.Value(0)
    // this.sizeAnim = new Animated.Value(styles.stepIndicatorSize)
    //this.borderRadiusAnim = new Animated.Value(styles.stepIndicatorSize / 2)
  }

  stepPressed(position) {
    const { onPress } = this.props
    if (onPress) {
      onPress(position)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentPosition } = this.props
    if (nextProps.currentPosition !== currentPosition) {
      this.onCurrentPositionChanged(nextProps.currentPosition)
    }
  }

  renderProgressBarBackground = () => {
    const { currentPosition, stepCount } = this.props
    const { width, height } = this.state

    const progressBarBackgroundStyle = {
      backgroundColor: this.styleConfig.separatorUnFinishedColor,
      position: 'absolute',
      top: (height - this.styleConfig.separatorStrokeWidth) / 2,
      left: width / (2 * stepCount),
      right: width / (2 * stepCount),
      height:
        this.styleConfig.separatorStrokeUnfinishedWidth === 0
          ? this.styleConfig.separatorStrokeWidth
          : this.styleConfig.separatorStrokeUnfinishedWidth,
    }

    return (
      <View
        onLayout={event => {
          this.setState(
            { progressBarSize: event.nativeEvent.layout.width },
            () => {
              this.onCurrentPositionChanged(currentPosition)
            }
          )
        }}
        style={progressBarBackgroundStyle}
      />
    )
  }

  renderProgressBar = () => {
    const { stepCount } = this.props
    const { height, width } = this.state

    const progressBarStyle = {
      backgroundColor: this.styleConfig.separatorFinishedColor,
      position: 'absolute',
      top: (height - this.styleConfig.separatorStrokeWidth) / 2,
      left: width / (2 * stepCount),
      right: width / (2 * stepCount),
      height:
        this.styleConfig.separatorStrokeFinishedWidth === 0
          ? this.styleConfig.separatorStrokeWidth
          : this.styleConfig.separatorStrokeFinishedWidth,
      width: this.progressAnim,
    }

    return <Animated.View style={progressBarStyle} />
  }

  renderStepIndicator = () => {
    const steps = []
    const { stepCount } = this.props

    for (let position = 0; position < stepCount; position++) {
      steps.push(
        <TouchableWithoutFeedback
          key={position}
          onPress={() => this.stepPressed(position)}
        >
          <View style={styles.stepContainer}>{this.renderStep(position)}</View>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <View
        onLayout={event =>
          this.setState({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          })
        }
        style={[
          styles.stepIndicatorContainer,
          {
            flexDirection: 'row',
            height: this.styleConfig.currentStepIndicatorSize,
          },
        ]}
      >
        {steps}
      </View>
    )
  }

  renderStepLabels = () => {
    const { labels, currentPosition } = this.props

    const labelViews = labels.map((label, index) => {
      const selectedStepLabelStyle =
        index <= currentPosition
          ? { color: this.styleConfig.currentStepLabelColor }
          : { color: this.styleConfig.labelColor }

      return (
        <TouchableWithoutFeedback
          style={styles.stepLabelItem}
          key={index}
          onPress={() => this.stepPressed(index)}
        >
          <View style={styles.stepLabelItem}>
            <Text
              style={[
                styles.stepLabel,
                selectedStepLabelStyle,
                { fontSize: styles.labelSize },
              ]}
            >
              {label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })

    return (
      <View
        style={[
          styles.stepLabelsContainer,
          { flexDirection: 'row', paddingVertical: 4 },
        ]}
      >
        {labelViews}
      </View>
    )
  }

  renderStep = position => {
    const { renderStepIndicator } = this.props
    let stepStyle
    let indicatorLabelStyle

    switch (this.getStepStatus(position)) {
      case STEP_STATUS.CURRENT: {
        stepStyle = {
          backgroundColor: this.styleConfig.stepIndicatorCurrentColor,
          borderWidth: this.styleConfig.currentStepStrokeWidth,
          borderColor: this.styleConfig.stepStrokeCurrentColor,
          height: this.styleConfig.stepIndicatorSize,
          width: this.styleConfig.stepIndicatorSize,
          borderRadius: this.styleConfig.stepIndicatorSize / 2,
          // height: this.sizeAnim,
          // width: this.sizeAnim,
          // borderRadius: this.borderRadiusAnim,
        }
        indicatorLabelStyle = {
          fontSize: this.styleConfig.currentStepIndicatorLabelFontSize,
          color: this.styleConfig.stepIndicatorLabelCurrentColor,
        }

        break
      }
      case STEP_STATUS.FINISHED: {
        stepStyle = {
          backgroundColor: this.styleConfig.stepIndicatorFinishedColor,
          borderWidth: this.styleConfig.stepStrokeWidth,
          borderColor: this.styleConfig.stepStrokeFinishedColor,
          height: this.styleConfig.stepIndicatorSize,
          width: this.styleConfig.stepIndicatorSize,
          borderRadius: this.styleConfig.stepIndicatorSize / 2,
        }
        indicatorLabelStyle = {
          fontSize: this.styleConfig.stepIndicatorLabelFontSize,
          color: this.styleConfig.stepIndicatorLabelFinishedColor,
        }
        break
      }

      case STEP_STATUS.UNFINISHED: {
        stepStyle = {
          backgroundColor: this.styleConfig.stepIndicatorUnFinishedColor,
          borderWidth: this.styleConfig.stepStrokeWidth,
          borderColor: this.styleConfig.stepStrokeUnFinishedColor,
          height: this.styleConfig.stepIndicatorSize,
          width: this.styleConfig.stepIndicatorSize,
          borderRadius: this.styleConfig.stepIndicatorSize / 2,
        }
        indicatorLabelStyle = {
          overflow: 'hidden',
          fontSize: this.styleConfig.stepIndicatorLabelFontSize,
          color: this.styleConfig.stepIndicatorLabelUnFinishedColor,
        }
        break
      }
      default:
    }

    return (
      <Animated.View key="step-indicator" style={[styles.step, stepStyle]} />
    )
  }

  getStepStatus = stepPosition => {
    const { currentPosition } = this.props

    if (stepPosition === currentPosition) {
      return STEP_STATUS.CURRENT
    }

    if (stepPosition < currentPosition) {
      return STEP_STATUS.FINISHED
    }

    return STEP_STATUS.UNFINISHED
  }

  onCurrentPositionChanged = position => {
    const { stepCount } = this.props
    const { progressBarSize } = this.state

    if (position > stepCount - 1) {
      position = stepCount - 1
    }

    const animateToPosition = (progressBarSize / (stepCount - 1)) * position
    // this.sizeAnim.setValue(this.styleConfig.stepIndicatorSize)
    // this.borderRadiusAnim.setValue(this.styleConfig.stepIndicatorSize / 2)

    Animated.sequence([
      Animated.timing(this.progressAnim, {
        toValue: animateToPosition,
        duration: 200,
      }),
      // Animated.parallel([
      //   Animated.timing(this.sizeAnim, {
      //     toValue: this.styleConfig.currentStepIndicatorSize,
      //     duration: 100,
      //   }),
      //   Animated.timing(this.borderRadiusAnim, {
      //     toValue: this.styleConfig.currentStepIndicatorSize / 2,
      //     duration: 100,
      //   }),
      // ]),
    ]).start()
  }

  render() {
    const { labels } = this.props
    const { width } = this.state

    return (
      <View style={styles.container}>
        {labels && this.renderStepLabels()}
        <View>
          {width !== 0 && this.renderProgressBarBackground()}
          {width !== 0 && this.renderProgressBar()}
          {this.renderStepIndicator()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  stepLabelsContainer: {
    justifyContent: 'space-around',
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepLabelItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default StepIndicator
