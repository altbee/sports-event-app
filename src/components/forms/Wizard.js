import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'

import StepIndicator from './StepIndicator'
import GradientButton from '../gradientButton'

class Wizard extends React.Component {
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues,
    }
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }))

  previous = () =>
    this.setState(state => ({ page: Math.max(state.page - 1, 0) }))

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const pageCount = React.Children.count(children) - 1
    const isLastPage = page === pageCount

    const isValid = this.props.onNext(page)
    if (!isValid) {
      return
    }

    if (isLastPage) {
      return onSubmit(values, bag)
    }

    bag.setTouched({})
    bag.setSubmitting(false)
    this.next(values)
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const pageCount = React.Children.count(children)
    const isLastPage = page === React.Children.count(children) - 1

    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ isSubmitting, handleSubmit }) => (
          <View style={styles.container}>
            <View style={styles.stepContainer}>
              <StepIndicator
                currentPosition={page}
                stepCount={pageCount}
                labels={['1', '2', '3', '4']}
              />
            </View>

            {activePage}

            <View style={styles.buttonContainer}>
              {page > 0 && (
                <View style={styles.button}>
                  <GradientButton
                    title="Previous"
                    onPress={this.previous}
                    raised
                    color="white"
                    blackGradient
                    containerStyle={styles.graButtonContainer}
                    buttonStyle={styles.graButton}
                    titleStyle={styles.graText}
                  />
                </View>
              )}
              {!isLastPage && (
                <View style={styles.button}>
                  <GradientButton
                    title="Next"
                    onPress={handleSubmit}
                    raised
                    containerStyle={styles.graButtonContainer}
                    buttonStyle={styles.graButton}
                    titleStyle={styles.graText}
                  />
                </View>
              )}
              {isLastPage && (
                <View style={styles.button}>
                  <GradientButton
                    title="Submit"
                    disabled={isSubmitting}
                    raised
                    containerStyle={styles.graButtonContainer}
                    buttonStyle={styles.graButton}
                    titleStyle={styles.graText}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    width: '40%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 6,
  },
  graButtonContainer: {
    height: 46,
    borderRadius: 23,
  },
  graButton: {
    height: 46,
    borderRadius: 23,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
})

export default Wizard
