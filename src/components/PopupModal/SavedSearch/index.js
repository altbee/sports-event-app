import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, FlatList } from 'react-native'

import Popup from '../Popup'
import SavedSearchItem from './SavedSearchItem'

const mockData = [
  'Casual football sessions',
  'Hiking around Lake District',
  'Swimming lessons for Brandon',
  'Thursday squash sessions',
  'Casual football sessions1',
  'Hiking around Lake District1',
  'Swimming lessons for Brandon1',
  'Thursday squash sessions1',
  'Casual football sessions2',
  'Hiking around Lake District2',
  'Swimming lessons for Brandon2',
  'Thursday squash sessions2',
  'Casual football sessions3',
  'Hiking around Lake District3',
  'Swimming lessons for Brandon3',
  'Thursday squash sessions3',
]

const SavedSearch = ({ visible, onClose, data, onDelete }) => (
  <Popup title="SAVED SEARCHES" visible={visible} onClose={onClose}>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <SavedSearchItem title={item} onDelete={onDelete} />
      )}
      keyExtractor={(item) => item}
      style={styles.list}
    />
  </Popup>
)

SavedSearch.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.array,
}

SavedSearch.defaultProps = {
  data: mockData,
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
})

export default SavedSearch
