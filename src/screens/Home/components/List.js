import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native'
import ListItem from './ListItem'
import colors from '../../../assets/colors'
import IconButton from '../../../components/Buttons/IconButton'

const { width } = Dimensions.get('screen')

const mockData = []

function addMockData() {
  for (let index = 0; index < 30; index += 1) {
    mockData.push({
      id: index,
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      fullName: 'Bikram Yoga',
      address: '34 Denmark Road, M5 6AT',
      distance: 0.6,
      dateTime: 'Today, 18:00',
    })
  }
}

addMockData()

class List extends Component {
  state = {
    height: 0,
    oneItemHeight: 0,
    currentPosition: 0,
  }

  fadeAnimation = new Animated.Value(1)

  viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeAnimation, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }

  keyExtractor = item => `key${item.id}`

  onViewableItemsChanged = ({ viewableItems }) => {
    this.setState({
      itemsVisibleCount: viewableItems.length,
      currentIndex: viewableItems[0].index,
    })
  }

  goToNext = () => {
    const { currentPosition, oneItemHeight, height } = this.state
    if ((currentPosition + height * 2) / oneItemHeight >= mockData.length) {
      this.list.scrollTo({
        y: mockData.length * oneItemHeight - height,
        animated: true,
      })
    } else {
      const y =
        parseInt((currentPosition + height) / oneItemHeight, 10) * oneItemHeight
      this.list.scrollTo({
        y,
        animated: true,
      })
    }
  }

  onScroll = event => {
    const {
      nativeEvent: {
        contentOffset: { y },
      },
    } = event
    this.setState({
      currentPosition: y,
    })
  }

  render() {
    const { currentPosition, oneItemHeight, height } = this.state
    const moreButtonShow =
      (currentPosition + height) / oneItemHeight < mockData.length
    return (
      <View style={styles.container}>
        <ScrollView
          onLayout={event => {
            const { height } = event.nativeEvent.layout
            this.setState({
              height,
              currentPosition: 0,
            })
          }}
          ref={ref => {
            this.list = ref
          }}
          onScroll={this.onScroll}
        >
          <ListItem
            {...mockData[0]}
            key={'0'}
            onLayout={event => {
              const { height } = event.nativeEvent.layout
              this.setState({
                oneItemHeight: height,
              })
            }}
          />
          {mockData.map((item, index) =>
            index === 0 ? null : <ListItem {...item} key={item.id} />
          )}
        </ScrollView>
        <Animated.View
          style={{
            ...styles.icon,
            opacity: moreButtonShow ? this.fadeAnimation : 0,
          }}
        >
          <IconButton
            name="angle-double-down"
            color={colors.pink1}
            onClick={this.goToNext}
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    paddingBottom: 40,
    position: 'relative',
  },
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    marginLeft: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 15,
    left: width / 2 - 35 / 2,
  },
})

export default List
