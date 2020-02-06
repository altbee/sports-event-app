import React, { Component } from 'react'
import {
  ActivityIndicator, FlatList, StyleSheet, View,
} from 'react-native'
import { compose, graphql } from 'react-apollo'
import { branch, hoistStatics, renderComponent } from 'recompose'
import { ListItem, SearchBar } from 'react-native-elements'
import orderBy from 'lodash/orderBy'

import NavigationType from '../../config/navigation/propTypes'
import { ACTIVITIES_QUERY } from '../../graphql/queries'

class SelectActivityScreen extends Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  }

  static navigationOptions = {
  }

  constructor(props) {
    super(props)

    const { activitiesQuery } = props

    this.state = {
      data: orderBy(activitiesQuery.activities, ['featured', 'name']),
      search: '',
    }
  }

  updateSearch = search => this.setState({ search })

  render() {
    const { navigation } = this.props
    const { data, search } = this.state
    const searchString = search.toLowerCase()
    const callback = navigation.getParam('callback')

    const activities = data.filter(
      activity => activity.name.toLowerCase().search(searchString) !== -1
    )

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatList
          data={activities}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              onPress={() => {
                callback(item)
                navigation.goBack()
              }}
              chevron
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

const renderWhileLoading = () => branch(
  props => props.activitiesQuery.loading,
  renderComponent(() => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  )),
)

const enhancedComonent = compose(
  graphql(ACTIVITIES_QUERY, {
    name: 'activitiesQuery',
  }),
  renderWhileLoading(),
)

export default hoistStatics(enhancedComonent)(SelectActivityScreen)
