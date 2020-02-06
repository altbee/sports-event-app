import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Constants } from 'expo'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import NavigationType from '../../config/navigation/propTypes'
import theme from '../../config/theme'

class SelectVenueScreen extends Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    const {
      navigation: {
        state: {
          params: { venueSearch },
        },
      },
    } = props
    this.state = {
      venueSearch,
    }
  }

  goBack = () => {
    const { venueSearch } = this.state
    const { navigation } = this.props
    const callback = navigation.getParam('callback')
    callback(venueSearch)
    navigation.goBack()
  }

  clear = () => {
    this.setState({
      venueSearch: '',
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
        <Text style={styles.title}>CREATE EVENT</Text>
        <TouchableOpacity onPress={this.clear}>
          <Text style={styles.clearButton}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { venueSearch } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          enablePoweredByContainer={false}
          renderDescription={row => row.description} // custom description render
          onPress={data => {
            this.setState({
              venueSearch: data.description,
            })
          }}
          renderRow={row => {
            return (
              <View style={styles.rowContainer} key={row.id}>
                <Icon
                  name="location-pin"
                  type="simple-line-icon"
                  size={16}
                  color={theme.colors.black}
                  containerStyle={styles.rowIcon}
                />
                <Text style={styles.rowTitle}>{row.description}</Text>
                <Text
                  style={styles.rowComment}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {}
                </Text>
              </View>
            )
          }}
          text={venueSearch}
          getDefaultValue={() => venueSearch}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyBopRDu051G9W6fqJCwGgzxGICzhzuUxIg',
            language: 'en', // language of the results
          }}
          styles={{
            container: {
              margin: 20,
            },
            textInputContainer: {
              width: '100%',
              backgroundColor: theme.colors.white,
              padding: 0,
              borderTopWidth: 0,
              borderBottomColor: theme.colors.secondary,
            },
            textInput: {},
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            separator: {
              marginLeft: 40,
              backgroundColor: theme.colors.greyOutline,
            },
          }}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'cafe',
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => null}
        />
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

  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.greyOutline,
    marginTop: Platform.select({ ios: 0, android: Constants.statusBarHeight }),
  },
  title: {
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
  rowContainer: {
    flexDirection: 'row',
  },
  rowIcon: {
    marginRight: 20,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginRight: 20,
  },
  rowComment: {
    fontSize: 12,
    color: theme.colors.black,
    opacity: 0.5,
  },
})

export default SelectVenueScreen
