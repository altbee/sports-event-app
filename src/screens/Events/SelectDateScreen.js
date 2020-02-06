import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native'
import { Divider, Icon } from 'react-native-elements'
import orderBy from 'lodash/orderBy'
import { Calendar } from 'react-native-calendars'
import Switch from 'react-native-switch-pro'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Constants } from 'expo'

import NavigationType from '../../config/navigation/propTypes'
import theme from '../../config/theme'
import { dateStringToDMM, getTimeFromUTCDateStr } from '../../utils/convert'
import GradientButton from '../../components/gradientButton'

const EventItem = ({ event, onDelete, onTimePick }) => {
  return (
    <View style={styles.eventItemContainer}>
      <Icon
        name="clock"
        type="feather"
        size={22}
        color={theme.colors.secondary}
        containerStyle={styles.icon}
      />
      <Text style={styles.eventTitle}>{dateStringToDMM(event.date)}</Text>
      <View style={styles.eventTimes}>
        <TouchableOpacity
          onPress={() => {
            onTimePick('start', event.start)
          }}
        >
          <Text
            style={
              event.start === ''
                ? styles.eventTimeTextDisabled
                : styles.eventTimeText
            }
          >
            {event.start === '' ? 'Start time' : event.start}
          </Text>
        </TouchableOpacity>
        <Text style={styles.eventTimeDivider}>-</Text>
        <TouchableOpacity
          onPress={() => {
            onTimePick('end', event.end)
          }}
        >
          <Text
            style={
              event.end === ''
                ? styles.eventTimeTextDisabled
                : styles.eventTimeText
            }
          >
            {event.end === '' ? 'End time' : event.end}
          </Text>
        </TouchableOpacity>
      </View>

      <Icon
        name="close"
        type="antdesign"
        containerStyle={styles.icon}
        size={18}
        color={theme.colors.primary}
        onPress={onDelete}
      />
    </View>
  )
}

class SelectDateScreen extends Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    const { events, otherDates, allTimesSame } = props.navigation.state.params

    this.state = {
      events,
      otherDates,
      allTimesSame,
      current: new Date(),
      isDateTimePickerVisible: false,
      selIndex: 0,
      selKey: '',
      selValue: '',
    }
  }

  componentWillReceiveProps(newProps) {
    const { events, otherDates, allTimesSame } = this.state
    if (
      JSON.stringify({ events, otherDates, allTimesSame }) !==
      JSON.stringify({
        events: newProps.navigation.state.events,
        otherDates: newProps.navigation.state.otherDates,
        allTimesSame: newProps.navigation.state.allTimesSame,
      })
    ) {
      this.setState({
        events: newProps.navigation.state.events,
        otherDates: newProps.navigation.state.otherDates,
        allTimesSame: newProps.navigation.state.allTimesSame,
        current: new Date(),
      })
    }
  }

  onSave = () => {
    const { navigation } = this.props
    const callback = navigation.getParam('callback')
    const { events, otherDates, allTimesSame } = this.state

    callback({ events: orderBy(events, ['date']), otherDates, allTimesSame })
    navigation.goBack()
  }

  onAllTimes = () => {
    const { allTimesSame, events } = this.state
    if (allTimesSame) {
      this.setState({
        allTimesSame: !allTimesSame,
      })
    } else {
      let index = 1
      for (; index < events.length; index++) {
        events[index].start = events[0].start
        events[index].end = events[0].end
      }
      this.setState({
        allTimesSame: !allTimesSame,
        events: [...events],
      })
    }
  }

  onSelectDay = day => {
    const { dateString } = day
    const { events, allTimesSame } = this.state
    if (allTimesSame) {
      if (events.length === 0) {
        const newEvents = [...events, { date: dateString, start: '', end: '' }]
        this.setState({
          events: newEvents,
        })
      } else {
        const newEvents = [
          ...events,
          { date: dateString, start: events[0].start, end: events[0].end },
        ]
        this.setState({
          events: newEvents,
        })
      }
    } else {
      const newEvents = [...events, { date: dateString, start: '', end: '' }]
      this.setState({
        events: newEvents,
      })
    }
  }

  onDeleteEvent(index) {
    const { events } = this.state
    events.splice(index, 1)
    this.setState({ events: [...events] })
  }

  onShowTimePicker(index, key, value) {
    if (index < 0) {
      this.setState({ isDateTimePickerVisible: false })
      return
    }
    this.setState({
      selIndex: index,
      selKey: key,
      isDateTimePickerVisible: true,
      selValue: value,
    })
  }

  onConfirmTime = date => {
    const { events, selIndex, selKey } = this.state

    events[selIndex][selKey] = getTimeFromUTCDateStr(date)

    this.setState({
      isDateTimePickerVisible: false,
      events: [...events],
    })
  }

  goBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  clear = () => {
    this.setState({
      events: [],
    })
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Icon
          name="left"
          type="antdesign"
          size={20}
          containerStyle={styles.iconButton}
          onPress={this.goBack}
        />
        <Text style={styles.headerTitle}>CREATE EVENT</Text>
        <TouchableOpacity onPress={this.clear}>
          <Text style={styles.clearButton}>RESET</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    const callback = navigation.getParam('callback')
    const {
      events,
      otherDates,
      allTimesSame,
      current,
      isDateTimePickerVisible,
      selValue,
    } = this.state
    const markedDates = {}
    otherDates.forEach(date => {
      markedDates[date] = { marked: true }
    })
    events.forEach(e => {
      markedDates[e.date] = { marked: true, selected: true }
    })
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.onConfirmTime}
          onCancel={() => {
            this.onShowTimePicker(-1, 0, 0)
          }}
          selectedValue={selValue}
          mode="time"
        />
        <ScrollView>
          <Text style={styles.title}>
            Select the days you want your event{'\n'}to take place
          </Text>
          <View style={styles.calendarContainer}>
            <Calendar
              current={current}
              markedDates={markedDates}
              theme={{
                arrowColor: theme.colors.secondary,
                monthTextColor: theme.colors.secondary,
                textMonthFontWeight: 'bold',
                selectedDayTextColor: theme.colors.primary,
                textDayFontSize: 14,
                dotColor: theme.colors.primary,
                selectedDotColor: theme.colors.primary,
                'stylesheet.calendar.header': {
                  header: {
                    paddingLeft: 30,
                    paddingRight: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  dayHeader: {
                    marginTop: 2,
                    marginBottom: 7,
                    width: 32,
                    fontSize: 12,
                    color: theme.colors.secondary,
                    textAlign: 'center',
                  },
                  week: {
                    marginTop: 7,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderBottomColor: theme.colors.gray6,
                    borderBottomWidth: 1,
                  },
                },
              }}
              dayComponent={({ date, state }) => {
                const { day, dateString } = date
                const isMarked = otherDates.indexOf(dateString) !== -1
                const isCircled =
                  events.map(e => e.date).indexOf(dateString) !== -1
                let containerStyle = styles.dayContainer
                let textStyle = styles.dayText
                let markerStyle = styles.dayMarkedDot
                if (isCircled) {
                  containerStyle = {
                    ...containerStyle,
                    ...styles.dayContainerCircle,
                  }
                  textStyle = { ...textStyle, ...styles.dayTextCircled }
                  markerStyle = {
                    ...markerStyle,
                    ...styles.dayMarkerDotCircled,
                  }
                }

                if (state === 'disabled') {
                  containerStyle = {
                    ...containerStyle,
                    ...styles.dayContainerDisabled,
                  }
                }

                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (state === 'disabled') {
                        this.setState({ current: dateString })
                      } else {
                        this.onSelectDay(date)
                      }
                    }}
                  >
                    <View style={containerStyle}>
                      <Text style={textStyle}>{day}</Text>
                      {isMarked && <View style={markerStyle} />}
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>

          <Divider />
          <View style={styles.eventsContainer}>
            {events.map((event, index) => (
              <EventItem
                event={event}
                key={event.date}
                onDelete={() => {
                  this.onDeleteEvent(index)
                }}
                onTimePick={(key, value) => {
                  this.onShowTimePicker(index, key, value)
                }}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <View style={styles.bottomTop}>
            <Switch value={allTimesSame} onSyncPress={this.onAllTimes} />
            <Text style={styles.allTimeText}>All times the same</Text>
          </View>
          <View style={styles.bottomButton}>
            <GradientButton title="Save" onPress={this.onSave} />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 14,
    marginVertical: 20,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottom: {
    marginVertical: 20,
    alignItems: 'center',
  },
  bottomTop: {
    alignItems: 'center',
  },
  bottomButton: { width: '70%' },
  allTimeText: {
    color: theme.colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  dayContainer: {
    position: 'relative',
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainerCircle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 21,
  },
  dayContainerDisabled: {
    opacity: 0.2,
  },
  dayText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  dayTextCircled: {
    color: theme.colors.white,
  },
  dayMarkedDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    left: 18,
    top: 4,
  },
  dayMarkerDotCircled: {
    backgroundColor: theme.colors.white,
  },
  eventsContainer: {
    paddingVertical: 10,
  },
  eventItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginLeft: 15,
    width: 50,
  },
  eventTimeText: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  eventTimeTextDisabled: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  eventTimeDivider: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    margin: 10,
  },
  eventTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  icon: {},

  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: Platform.select({ ios: 0, android: Constants.statusBarHeight }),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.greyOutline,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  clearButton: {
    color: theme.colors.primary,
    fontSize: 12,
    padding: 0,
    margin: 0,
  },
  iconButton: {
    marginRight: 20,
  },
})

export default SelectDateScreen
