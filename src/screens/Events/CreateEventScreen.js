import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native'
import { Input, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { withFormik } from 'formik'
import { Constants } from 'expo'
import RNPickerSelect from 'react-native-picker-select'

import Wizard from '../../components/forms/Wizard'
import PricingForm from '../../components/forms/PricingForm'
import DescribeForm from '../../components/forms/DescribeForm'
import AcceptCashForm from '../../components/forms/AcceptCashForm'

import theme from '../../config/theme'
import DateTimeForm from '../../components/forms/DateTimeForm'
import VenueSearchForm from '../../components/forms/VenueSearchForm'
import { MyEventsStack } from '../../config/navigation/MainTabNavigator'
import TabBarIcon from '../../components/TabBarIcon'

const defaultGender = ''
const pickerGender = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const defaultSkillLevel = 'open'
const pickerSkillLevel = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Pro', value: 'pro' },
  { label: 'Open ', value: 'open' },
]

const defaultPrivacyValue = 'public'
const pickerPrivacy = [
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'Private' },
]

const defaultVenue = ''
const pickerVenue = [
  { label: 'Indoor', value: 'indoor' },
  { label: 'Outdoor', value: 'outdoor' },
]

const defaultRefundPolicy = ''
const pickerRefundPolicy = [
  { label: 'full', value: 'Full' },
  { label: 'partial', value: 'Partial' },
  { label: 'none', value: 'None' },
]

class CreateEventScreen extends Component {
  static propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.header}>
        <Icon
          name="left"
          type="antdesign"
          size={20}
          onPress={() => {
            navigation.goBack()
            MyEventsStack.navigationOptions = {
              tabBarVisible: true,
              tabBarLabel: 'My Events',
              tabBarIcon: props => <TabBarIcon name="running" {...props} />,
              title: 'My Events',
            }
          }}
        />
        <Text style={styles.headerTitle}>CREATE EVENT</Text>
        <Icon
          name="left"
          type="antdesign"
          size={20}
          containerStyle={styles.empty}
        />
      </View>
    ),
  })

  static getDisplayValue(choices, inputValue) {
    const selectedPair = choices.find(({ value }) => value === inputValue)
    if (selectedPair === undefined) {
      return ''
    }
    const { label } = selectedPair
    return label
  }

  goToSelectActivity = () => {
    const { navigation, setFieldValue } = this.props

    navigation.navigate('SelectActivityScreen', {
      callback: activity => {
        setFieldValue('activityName', activity.name)
        setFieldValue('activityId', activity.id)
      },
    })
  }

  handlePickerValue = (field, value) => {
    const { setFieldValue } = this.props
    setFieldValue(field, value)
  }

  onAddPrice = () => {
    const {
      values: { prices },
      setFieldValue,
    } = this.props
    prices.push({ value: '£0', description: '' })
    setFieldValue('prices', prices)
  }

  onDeleteItem = index => {
    const {
      values: { prices },
      setFieldValue,
    } = this.props
    prices.splice(index, 1)
    setFieldValue('prices', prices)
  }

  onChangePriceItemField = ({ index, key, value }) => {
    const {
      values: { prices },
      setFieldValue,
    } = this.props
    const newData = {}
    newData[key] = value
    prices[index] = { ...prices[index], ...newData }
    setFieldValue('prices', prices)
  }

  onChangeCashAccepted = accepted => {
    const { setFieldValue } = this.props
    setFieldValue('acceptCash', accepted)
  }

  onSelectDateTime = () => {
    const { navigation, setFieldValue, values } = this.props

    const { events, otherDates, allTimesSame } = values

    navigation.navigate('SelectDateScreen', {
      callback: value => {
        setFieldValue('events', value.events)
        setFieldValue('otherDates', value.otherDates)
        setFieldValue('allTimesSame', value.allTimesSame)
      },
      events,
      otherDates,
      allTimesSame,
    })
  }

  onSelectVenueSearch = () => {
    const { navigation, setFieldValue, values } = this.props

    const { venueSearch } = values

    navigation.navigate('SelectVenueScreen', {
      callback: value => {
        setFieldValue('venueSearch', value)
      },
      venueSearch,
    })
  }

  onNextPage = page => {
    let fields = []
    if (page === 0) {
      fields = [
        'name',
        'activityName',
        'gender',
        'skillLevel',
        'minimumAge',
        'maximumAge',
        'minimum',
        'maximum',
        'privacy',
      ]
    } else if (page === 1) {
      fields = [
        'venue',
        'description',
        'rules',
        'additionalNotes',
        'refundPolicy',
        'venueSearch',
      ]
    }
    const { setFieldTouched, values } = this.props
    let valid = true
    fields.forEach(key => {
      if (values[key] === '') {
        setFieldTouched(key)
        valid = false
      }
    })
    return valid
  }

  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      setFieldTouched,
    } = this.props

    const { prices } = values

    return (
      <SafeAreaView style={styles.container}>
        <Wizard onNext={this.onNextPage}>
          <Wizard.Page>
            <View style={styles.wizardContainer}>
              <ScrollView>
                <Input
                  label="NAME"
                  placeholder="Your name"
                  value={values.name}
                  onBlur={() => setFieldTouched('name')}
                  onChangeText={handleChange('name')}
                  errorMessage={
                    touched.name && errors.name ? errors.name : undefined
                  }
                  editable={!isSubmitting}
                  labelStyle={styles.label}
                  inputStyle={
                    values.name === '' ? styles.input : styles.inputActive
                  }
                  inputContainerStyle={styles.inputContainer}
                />

                <TouchableOpacity
                  style={styles.inputTouchableOpacity}
                  onPress={this.goToSelectActivity}
                >
                  <Input
                    label="ACTIVITY"
                    placeholder="Activity"
                    value={values.activityName}
                    onBlur={() => setFieldTouched('activityName')}
                    onChangeText={handleChange('activityName')}
                    errorMessage={
                      touched.activityName && errors.activityName
                        ? errors.activityName
                        : undefined
                    }
                    editable={false}
                    pointerEvents="none"
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.activityName === ''
                        ? styles.input
                        : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </TouchableOpacity>

                <RNPickerSelect
                  placeholder={{}}
                  items={pickerGender}
                  onValueChange={itemValue =>
                    this.handlePickerValue('gender', itemValue)
                  }
                >
                  <Input
                    label="GENDER"
                    placeholder="Gender"
                    value={CreateEventScreen.getDisplayValue(
                      pickerGender,
                      values.gender
                    )}
                    onBlur={() => setFieldTouched('gender')}
                    onChangeText={handleChange('gender')}
                    errorMessage={
                      touched.gender && errors.gender
                        ? errors.gender
                        : undefined
                    }
                    editable={false}
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.gender === '' ? styles.input : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </RNPickerSelect>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Input
                      placeholder="Minimum Age"
                      value={values.minimumAge}
                      onBlur={() => setFieldTouched('minimumAge')}
                      onChangeText={handleChange('minimumAge')}
                      errorMessage={
                        touched.minimumAge && errors.minimumAge
                          ? errors.minimumAge
                          : undefined
                      }
                      editable={!isSubmitting}
                      inputStyle={
                        values.minimumAge === ''
                          ? styles.input
                          : styles.inputActive
                      }
                      inputContainerStyle={styles.inputContainer}
                    />
                  </View>
                  <View style={styles.column}>
                    <Input
                      placeholder="Maximum Age"
                      value={values.maximumAge}
                      onBlur={() => setFieldTouched('maximumAge')}
                      onChangeText={handleChange('maximumAge')}
                      errorMessage={
                        touched.maximumAge && errors.maximumAge
                          ? errors.maximumAge
                          : undefined
                      }
                      editable={!isSubmitting}
                      inputStyle={
                        values.maximumAge === ''
                          ? styles.input
                          : styles.inputActive
                      }
                      inputContainerStyle={styles.inputContainer}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Input
                      placeholder="Minimum"
                      value={values.minimum}
                      onBlur={() => setFieldTouched('minimum')}
                      onChangeText={handleChange('minimum')}
                      errorMessage={
                        touched.minimum && errors.minimum
                          ? errors.minimum
                          : undefined
                      }
                      editable={!isSubmitting}
                      inputStyle={
                        values.minimum === ''
                          ? styles.input
                          : styles.inputActive
                      }
                      inputContainerStyle={styles.inputContainer}
                    />
                  </View>
                  <View style={styles.column}>
                    <Input
                      placeholder="Maximum"
                      value={values.maximum}
                      onBlur={() => setFieldTouched('maximum')}
                      onChangeText={handleChange('maximum')}
                      errorMessage={
                        touched.maximum && errors.maximum
                          ? errors.maximum
                          : undefined
                      }
                      editable={!isSubmitting}
                      inputStyle={
                        values.maximum === ''
                          ? styles.input
                          : styles.inputActive
                      }
                      inputContainerStyle={styles.inputContainer}
                    />
                  </View>
                </View>

                <RNPickerSelect
                  placeholder={{}}
                  items={pickerSkillLevel}
                  onValueChange={itemValue =>
                    this.handlePickerValue('skillLevel', itemValue)
                  }
                >
                  <Input
                    label="SKILL LEVEL"
                    value={CreateEventScreen.getDisplayValue(
                      pickerSkillLevel,
                      values.skillLevel
                    )}
                    onBlur={() => setFieldTouched('skillLevel')}
                    onChangeText={handleChange('skillLevel')}
                    errorMessage={
                      touched.skillLevel && errors.skillLevel
                        ? errors.skillLevel
                        : undefined
                    }
                    editable={false}
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.skillLevel === ''
                        ? styles.input
                        : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </RNPickerSelect>
                <RNPickerSelect
                  placeholder={{}}
                  items={pickerPrivacy}
                  onValueChange={itemValue =>
                    this.handlePickerValue('privacy', itemValue)
                  }
                >
                  <Input
                    label="PRIVACY"
                    placeholder="Privacy"
                    value={CreateEventScreen.getDisplayValue(
                      pickerPrivacy,
                      values.privacy
                    )}
                    onBlur={() => setFieldTouched('privacy')}
                    onChangeText={handleChange('privacy')}
                    errorMessage={
                      touched.privacy && errors.privacy
                        ? errors.privacy
                        : undefined
                    }
                    editable={false}
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.privacy === '' ? styles.input : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </RNPickerSelect>
              </ScrollView>
            </View>
          </Wizard.Page>
          <Wizard.Page>
            <View style={styles.wizard2Container}>
              <ScrollView>
                <VenueSearchForm
                  value={values.venueSearch}
                  onSelect={this.onSelectVenueSearch}
                />
                <DateTimeForm
                  events={values.events}
                  onSelect={this.onSelectDateTime}
                />
                <RNPickerSelect
                  placeholder={{}}
                  items={pickerVenue}
                  onValueChange={itemValue =>
                    this.handlePickerValue('venue', itemValue)
                  }
                >
                  <Input
                    label="VENUE TYPE"
                    placeholder="Indoor or Outdoor"
                    value={CreateEventScreen.getDisplayValue(
                      pickerVenue,
                      values.venue
                    )}
                    onBlur={() => setFieldTouched('venue')}
                    onChangeText={handleChange('venue')}
                    errorMessage={
                      touched.venue && errors.venue ? errors.venue : undefined
                    }
                    editable={false}
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.value === '' ? styles.input : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </RNPickerSelect>
                <PricingForm
                  prices={prices}
                  onAddPrice={this.onAddPrice}
                  onDeleteItem={this.onDeleteItem}
                  onChangePriceItem={this.onChangePriceItemField}
                />
                <AcceptCashForm
                  accepted={values.acceptCash}
                  onChange={this.onChangeCashAccepted}
                />
                <RNPickerSelect
                  placeholder={{}}
                  items={pickerRefundPolicy}
                  onValueChange={itemValue =>
                    this.handlePickerValue('refundPolicy', itemValue)
                  }
                >
                  <Input
                    label="REFUND POLICY"
                    placeholder="Full, partial or none"
                    value={CreateEventScreen.getDisplayValue(
                      pickerRefundPolicy,
                      values.refundPolicy
                    )}
                    onBlur={() => setFieldTouched('refundPolicy')}
                    onChangeText={handleChange('refundPolicy')}
                    errorMessage={
                      touched.refundPolicy && errors.refundPolicy
                        ? errors.refundPolicy
                        : undefined
                    }
                    editable={false}
                    rightIcon={{
                      type: 'material-community',
                      name: 'chevron-down',
                    }}
                    labelStyle={styles.label}
                    inputStyle={
                      values.refundPolicy === ''
                        ? styles.input
                        : styles.inputActive
                    }
                    inputContainerStyle={styles.inputContainer}
                    rightIconContainerStyle={styles.rightIcon}
                  />
                </RNPickerSelect>
                <DescribeForm
                  description={values.description}
                  rules={values.rules}
                  additionalNotes={values.additionalNotes}
                  onChangeField={this.handlePickerValue}
                  {...this.props}
                />
              </ScrollView>
            </View>
          </Wizard.Page>
          <Wizard.Page>
            <Input
              placeholder="Email 2"
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              errorMessage={
                touched.email && errors.email ? errors.email : undefined
              }
              editable={!isSubmitting}
              leftIcon={{
                type: 'material-community',
                name: 'email',
              }}
            />
          </Wizard.Page>
          <Wizard.Page>
            <Input
              placeholder="Email 2"
              value={values.email}
              onBlur={() => setFieldTouched('email')}
              onChangeText={handleChange('email')}
              errorMessage={
                touched.email && errors.email ? errors.email : undefined
              }
              editable={!isSubmitting}
              leftIcon={{
                type: 'material-community',
                name: 'email',
              }}
            />
          </Wizard.Page>
        </Wizard>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  inputTouchableOpacity: {
    width: '100%',
  },
  wizardContainer: {
    width: '100%',
    flex: 1,
  },
  wizard2Container: {
    paddingHorizontal: 5,
    width: '100%',
    flex: 1,
  },
  label: {
    color: theme.colors.secondary,
    fontSize: 12,
    marginBottom: 10,
  },
  input: {
    fontSize: 14,
    color: theme.colors.black,
    opacity: 0.5,
    fontStyle: 'italic',
    marginLeft: 0,
  },
  inputActive: { fontSize: 14, color: theme.colors.secondary, marginLeft: 0 },
  inputContainer: { height: 28 },
  rightIcon: {
    marginRight: 0,
    padding: 0,
  },
  header: {
    marginTop: Constants.statusBarHeight,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.greyOutline,
    width: '100%',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  empty: {
    opacity: 0,
  },
})

export default compose(
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      activityName: '',
      activityId: '',
      gender: defaultGender,
      skillLevel: defaultSkillLevel,
      minimumAge: '',
      maximumAge: '',
      minimum: '',
      maximum: '',
      privacy: defaultPrivacyValue,
      venue: defaultVenue,
      prices: [
        {
          value: '£0',
          description: '',
        },
      ],
      description: '',
      rules: '',
      additionalNotes: '',
      refundPolicy: defaultRefundPolicy,
      acceptCash: false,
      events: [],
      otherDates: [
        '2019-04-16',
        '2019-04-19',
        '2019-04-26',
        '2019-04-06',
        '2019-04-11',
      ],
      allTimesSame: false,
      venueSearch: '',
    }),
    validate: values => {
      const errors = {}
      Object.keys(values).forEach(key => {
        if (typeof values[key] === 'string' && values[key] === '') {
          errors[key] = "This field can't be empty"
        }
      })
      return errors
    },
  })
)(CreateEventScreen)
