import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import {
  MapView,
  Location,
  Permissions,
  Constants,
  PROVIDER_GOOGLE,
} from 'expo'
import { AntDesign } from '@expo/vector-icons'
import ClusteredMapView from 'react-native-maps-super-cluster'
import colors from '../../../assets/colors'
import OrfiIcon from '../../../components/OrfiIcon'

const { Marker } = MapView

const INIT_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
}

const mockData = [
  {
    location: { latitude: 52.0, longitude: 18.2 },
    events: [{ name: 'test' }],
  },
  {
    location: { latitude: 52.4, longitude: 18.7 },
    events: [{ name: 'test' }],
  },
  {
    location: { latitude: 52.1, longitude: 18.4 },
    events: [{ name: 'test wgegegf sfwf wr ' }],
  },
  {
    location: { latitude: 52.6, longitude: 18.3 },
    events: [{ name: 'test' }, { name: 'test2' }],
  },
  {
    location: { latitude: 44, longitude: 43 },
    events: [{ name: 'test' }],
  },
  {
    location: { latitude: 51.6, longitude: 18.0 },
    events: [{ name: 'test' }],
  },
  {
    location: { latitude: 53.1, longitude: 18.8 },
    events: [{ name: 'test' }, { name: 'test4' }],
  },
  {
    location: { latitude: 52.9, longitude: 19.4 },
    events: [{ name: 'test' }],
  },
]

export default class Map extends Component {
  state = {
    data: mockData,
    region: INIT_REGION,
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      alert(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      )
    } else {
      this.getLocationAsync()
    }
  }

  getLocationAsync = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        alert('Permission to access location was denied')
      }
      const location = await Location.getCurrentPositionAsync({})

      const {
        coords: { latitude, longitude },
      } = location
      const { region } = this.state
      const newRegion = { ...region, latitude, longitude }

      // this.map.mapview.animateToRegion(newRegion)
    } catch (error) {}
  }

  renderCluster = (cluster, onPress) => {
    const { pointCount, coordinate } = cluster
    return (
      <Marker
        coordinate={coordinate}
        onPress={onPress}
        tracksViewChanges={false}
      >
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
        </View>
      </Marker>
    )
  }

  renderMarker = data => (
    <Marker
      key={data.id || Math.random()}
      coordinate={data.location}
      tracksViewChanges={false}
    >
      <View style={styles.pin}>
        <View style={styles.pinComment}>
          <Text style={styles.pinText} ellipsizeMode="tail" numberOfLines={1}>
            {data.events.length === 1
              ? data.events[0].name
              : `${data.events.length} EVENTS`}
          </Text>
          <View style={styles.icon}>
            <AntDesign name="right" size={13} color={colors.black} />
          </View>
        </View>
        <OrfiIcon name="pin" size={35} color={colors.pink1} />
      </View>
    </Marker>
  )

  render() {
    const { data } = this.state

    return (
      <ClusteredMapView
        style={{ flex: 1 }}
        data={data}
        initialRegion={INIT_REGION}
        renderMarker={this.renderMarker}
        renderCluster={this.renderCluster}
        extent={200}
        provider={PROVIDER_GOOGLE}
        ref={ref => {
          this.map = ref
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  myClusterStyle: {
    backgroundColor: colors.pink1,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myClusterTextStyle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  pin: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinComment: {
    borderRadius: 19,
    height: 37,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 17,
    marginBottom: 3,
  },
  pinText: {
    fontSize: 10,
    color: colors.black1,
    width: 67,
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: colors.white2,
    width: 37,
    height: 37,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
