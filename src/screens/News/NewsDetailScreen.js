import React, { Component } from 'react'
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack'
import { LinearGradient } from 'expo'
import HTML from 'react-native-render-html'
import moment from 'moment'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import NavigationType from '../../config/navigation/propTypes'

const PLACEHOLDER = require('../../assets/images/news-list-default.jpg')

const { height: viewportHeight } = Dimensions.get('window')

class NewsDetailScreen extends Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  onPressBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    const article = navigation.getParam('article')
    const {
      content, publishedAt, title, urlToImage,
    } = article
    const renderImage = urlToImage ? { uri: urlToImage } : PLACEHOLDER
    const time = moment(publishedAt || moment.now()).fromNow()

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#212121' }}>
        <StatusBar translucent backgroundColor="transparent" />

        <ImageBackground source={renderImage} style={styles.image}>
          <LinearGradient colors={['#212121', 'transparent']} style={styles.buttonContainer}>
            <HeaderBackButton
              tintColor="#ffffff"
              onPress={this.onPressBack}
            />
          </LinearGradient>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          <HTML
            html={content}
            baseFontStyle={styles.baseFontStyle}
            ignoredStyles={['font-family', 'letter-spacing']}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.noteStyle}>{time}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: viewportHeight / 3,
  },
  buttonContainer: {
    paddingTop: getStatusBarHeight(),
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10,
  },
  container: {
    marginBottom: 12,
    backgroundColor: '#2A2A2B',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  baseFontStyle: {
    color: '#A0A0A0',
    fontSize: 16,
  },
})

export default NewsDetailScreen
