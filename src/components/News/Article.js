import React from 'react'
import {
  View, TouchableOpacity, Text, Image,
} from 'react-native'
import moment from 'moment'
import striptags from 'striptags'
import { withNavigation } from 'react-navigation'

const PLACEHOLDER = require('../../assets/images/news-list-default.jpg')

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 10,
  },
  container: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 12,
  },
  image: {
    height: 200,
  },
  title: {
    color: 'rgba(0, 0, 0, .85)',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    color: '#A0A0A0',
    fontSize: 12,
    fontStyle: 'italic',
  },
}

const Article = ({ article, navigation }) => {
  const {
    title,
    description,
    publishedAt,
    urlToImage,
  } = article

  const time = moment(publishedAt || moment.now()).fromNow()

  const renderImage = urlToImage ? { uri: urlToImage } : PLACEHOLDER

  return (
    <TouchableOpacity onPress={() => navigation.navigate('NewsDetailScreen', { article })}>
      <View style={styles.container}>
        <Image source={renderImage} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text numberOfLines={4} style={styles.subtitle}>
            {striptags(description)}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.noteStyle}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export default withNavigation(Article)
