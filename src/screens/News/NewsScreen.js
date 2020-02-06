import React, { Component } from 'react'
import {
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import apiFetch from '@wordpress/api-fetch'

import theme from '../../config/theme'
import Article from '../../components/News/Article'
import Loading from '../../components/Loading'
import SliderEntry from '../../components/News/SliderEntry'
import { sliderWidth, itemWidth } from '../../components/News/SliderEntry.style'

const wordpressUrl = 'https://orfimedia.com/wp-json/wp/v2/posts?_embed'

class NewsScreen extends Component {
  static navigationOptions = {
    title: 'ORFI Active',
  }

  state = {
    isLoading: true,
    newsPosts: [],
    error: null,
  }

  static renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax
        parallaxProps={parallaxProps}
      />
    )
  }

  componentDidMount() {
    apiFetch({ url: wordpressUrl }).then(newsPosts => this.setState({
      newsPosts,
      isLoading: false,
    })).catch(error => this.setState({
      error,
      isLoading: false,
    }))
  }

  createDataForRendering = () => {
    const { newsPosts } = this.state

    return newsPosts.map(post => ({
      content: post.content.rendered,
      title: post.title.rendered,
      description: post.excerpt.rendered,
      publishedAt: post.date,
      urlToImage: post._embedded['wp:featuredmedia'][0].source_url, // eslint-disable-line
      url: post.link,
    }))
  }

  renderCarousel = articles => (
    <View style={styles.exampleContainer}>
      <Carousel
        ref={c => this._slider1Ref = c}
        data={articles}
        renderItem={NewsScreen.renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages
        firstItem={1}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        inactiveSlideShift={20}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop
        loopClonesPerSide={2}
        autoplay
        autoplayDelay={500}
        autoplayInterval={3000}
      />
    </View>
  )

  renderList = (articles) => {
    const { refreshing } = this.state

    return (
      <FlatList
        data={articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
      />
    )
  }

  render() {
    const { isLoading } = this.state
    const articles = this.createDataForRendering()

    const carouselList = articles.slice(0, 3)
    const mainList = articles.slice(4)

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        {isLoading ? (
          <Loading />
        ) : (
          <ScrollView>
            {this.renderCarousel(carouselList)}
            {this.renderList(mainList)}
          </ScrollView>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  exampleContainer: {
    paddingVertical: 10,
  },
  exampleContainerDark: {
    backgroundColor: theme.colors.grey0,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
})

export default NewsScreen
