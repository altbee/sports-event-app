import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'

import Popup from '../Popup'
import FilterByDistance from './FilterByDistance'
import colors from '../../../assets/colors'
import BottomButtons from './BottomButtons'
import FilterByActivity from './FilterByActivity'
import FilterByGender from './FilterByGender'
import FilterByLevel from './FilterByLevel'
import FilterByDateTime from './FilterByDateTime'
import SaveSearchPopup from '../SaveSearchPopup'

const headerRightComponent = onReset => (
  <Button
    type="clear"
    title="RESET"
    titleStyle={styles.headerRightButtonTitle}
    onPress={onReset}
  />
)

class SearchPopup extends Component {
  constructor(props) {
    super(props)
    const {
      activityStatus,
      genderStatus,
      levelStatus,
      startDate,
      endDate,
      time,
      minDistance,
      maxDistance,
    } = this.props
    this.state = {
      activityStatus,
      genderStatus,
      levelStatus,
      startDate,
      endDate,
      time,
      saveSearchModalVisible: false,
      saveSearchName: '',
      minDistance,
      maxDistance,
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible !== newProps.visible) {
      this.setState({
        saveSearchModalVisible: false,
      })
    }
  }

  onPressItemOnActivity = (index, selected) => {
    const { activityStatus } = this.state
    activityStatus[index].selected = selected
    this.setState({
      activityStatus: [...activityStatus],
    })
  }

  onPressItemOnGender = (index, selected) => {
    const { genderStatus } = this.state
    genderStatus.forEach(e => {
      e.selected = false
    })

    genderStatus[index].selected = selected

    this.setState({
      genderStatus: [...genderStatus],
    })
  }

  onPressItemOnLevel = (index, selected) => {
    const { levelStatus } = this.state
    levelStatus.forEach(e => {
      e.selected = false
    })

    levelStatus[index].selected = selected

    this.setState({
      levelStatus: [...levelStatus],
    })
  }

  onLoadMoreActivity = () => {}

  onSearch = () => {
    // save search value
    const { onSearch } = this.props
    onSearch()
  }

  onSave = () => {
    this.setState({
      saveSearchModalVisible: true,
    })
  }

  closeSaveSearchModal = () => {
    this.setState({
      saveSearchModalVisible: false,
    })
  }

  onChangeField = key => value => {
    const newState = {}
    newState[key] = value
    this.setState({ ...newState })
  }

  onUpdateDistances = newDistances => {
    this.setState({ ...newDistances })
  }

  render() {
    const { onClose, onReset, onSave, updateSearchFields, visible } = this.props
    const {
      activityStatus,
      levelStatus,
      genderStatus,
      startDate,
      endDate,
      time,
      saveSearchModalVisible,
      saveSearchName,
      minDistance,
      maxDistance,
    } = this.state

    return (
      <Popup
        title="SEARCH(68 results)"
        onClose={onClose}
        visible={visible}
        headerRightComponent={headerRightComponent(onReset)}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FilterByDistance
                updateSearchFields={this.onUpdateDistances}
                min={minDistance}
                max={maxDistance}
              />
              <FilterByActivity
                data={activityStatus}
                onPressItem={this.onPressItemOnActivity}
                onLoadMore={this.onLoadMoreActivity}
              />
              <FilterByDateTime
                startDate={startDate}
                endDate={endDate}
                time={time}
              />
              <FilterByGender
                data={genderStatus}
                onPressItem={this.onPressItemOnGender}
              />
              <FilterByLevel
                data={levelStatus}
                onPressItem={this.onPressItemOnLevel}
              />
            </ScrollView>
          </View>
          <BottomButtons onSave={this.onSave} onSearch={this.onSearch} />
          <SaveSearchPopup
            visible={saveSearchModalVisible}
            onClose={this.closeSaveSearchModal}
            onUpdate={this.onChangeField('saveSearchName')}
            onSave={onSave}
            name={saveSearchName}
          />
        </View>
      </Popup>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  headerRightButtonTitle: {
    fontSize: 12,
    color: colors.pink1,
  },
})

SearchPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  updateSearchFields: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  activityStatus: PropTypes.array,
  genderStatus: PropTypes.array,
  levelStatus: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  time: PropTypes.string,
  minDistance: PropTypes.number,
  maxDistance: PropTypes.number,
}

SearchPopup.defaultProps = {
  startDate: '16 Jan',
  endDate: '18 Jan',
  time: '18:00',
  minDistance: 5,
  maxDistance: 90,
  genderStatus: [
    {
      id: 1,
      text: 'Male Only',
      selected: false,
    },
    {
      id: 2,
      text: 'Female Only',
      selected: false,
    },
    {
      id: 3,
      text: 'Mixed Only',
      selected: true,
    },
  ],
  levelStatus: [
    {
      id: 1,
      text: 'Beginner',
      selected: false,
    },
    {
      id: 2,
      text: 'Intermediate',
      selected: false,
    },
    {
      id: 3,
      text: 'Pro',
      selected: true,
    },
    {
      id: 4,
      text: 'Open',
      selected: false,
    },
  ],
  activityStatus: [
    {
      id: 1,
      text: 'Football',
      selected: false,
    },
    {
      id: 2,
      text: 'BasketBall',
      selected: false,
    },
    {
      id: 3,
      text: 'Tennis',
      selected: true,
    },
    {
      id: 4,
      text: 'Squash',
      selected: false,
    },
    {
      id: 5,
      text: 'Hiking',
      selected: false,
    },
    {
      id: 6,
      text: 'Rugby',
      selected: false,
    },
    {
      id: 7,
      text: 'Darts',
      selected: true,
    },
    {
      id: 8,
      text: 'Cycling',
      selected: false,
    },
  ],
}

export default SearchPopup
