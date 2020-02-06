import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { Location } from 'expo'
import get from 'lodash/get'
import pick from 'lodash/pick'
import Map from './components/Map'
import { getCoffeeShops } from '../../services/yelp'
import TopBar from './components/TopBar'
import List from './components/List'
import SavedSearch from '../../components/PopupModal/SavedSearch'
import SearchPopup from '../../components/PopupModal/SearchPopup'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'ORFI Active',
  }

  state = {
    location: null,
    coffeeShops: [],
    selectedTab: 0,
    savedSearchModalVisible: false,
    searchModalVisible: false,
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  onTabChanged = index => {
    this.setState({
      selectedTab: index,
    })
  }

  onCloseSavedSearchModal = () => {
    this.setState({ savedSearchModalVisible: false })
  }

  onCloseSearchModal = () => {
    this.setState({ searchModalVisible: false })
  }

  onDeleteSavedSearchItem = () => {}

  onShowSavedSearchModal = () => {
    this.setState({
      savedSearchModalVisible: true,
    })
  }

  onShowSearchModal = () => {
    this.setState({
      searchModalVisible: true,
    })
  }

  onResetSearch = () => {}

  onUpdateSearchFields = () => {}

  onSaveSearch = () => {
    this.setState({
      savedSearchModalVisible: true,
      searchModalVisible: false,
    })
  }

  onSearch = () => {
    this.onCloseSearchModal()
  }

  getCoffeeShops = async filter => {
    const { location } = this.state

    const coords = get(location, 'coords')
    const userLocation = pick(coords, ['latitude', 'longitude'])

    const coffeeShops = await getCoffeeShops(userLocation, filter)

    this.setState({ coffeeShops })
  }

  getLocationAsync = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({})
      await this.setState({ location })
    } catch (error) {
      await this.setState({
        location: { coords: { latitude: 43.2342, longitude: 41.3234 } },
      })
    }

    this.getCoffeeShops()
  }

  render() {
    const {
      location,
      coffeeShops,
      selectedTab,
      savedSearchModalVisible,
      searchModalVisible,
    } = this.state

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TopBar
          selectedTab={selectedTab}
          onTabChanged={this.onTabChanged}
          onSavedSearchModal={this.onShowSavedSearchModal}
          onSearchModal={this.onShowSearchModal}
        />
        {selectedTab === 0 ? (
          <Map location={location} places={coffeeShops} />
        ) : (
          <List />
        )}
        <SavedSearch
          visible={savedSearchModalVisible}
          onClose={this.onCloseSavedSearchModal}
          onDelete={this.onDeleteSavedSearchItem}
        />
        <SearchPopup
          visible={searchModalVisible}
          onClose={this.onCloseSearchModal}
          onReset={this.onResetSearch}
          updateSearchFields={this.onUpdateSearchFields}
          onSave={this.onSaveSearch}
          onSearch={this.onSearch}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 7,
  },
})

HomeScreen.propTypes = {}

export default HomeScreen
