import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import IconButton from '../../../components/Buttons/IconButton'
import colors from '../../../assets/colors'

const TopBar = ({
  selectedTab,
  onTabChanged,
  onSavedSearchModal,
  onSearchModal,
}) => (
  <View style={styles.container}>
    <View style={styles.iconsContainerEmpty}>
      <IconButton name="star" style={styles.iconButton} />
      <IconButton name="magnifying-glass" badge style={styles.iconButton} />
    </View>
    <SegmentedControlTab
      values={['MAP', 'LIST']}
      selectedIndex={selectedTab}
      onTabPress={onTabChanged}
      borderRadius={19}
      tabsContainerStyle={styles.tabsContainer}
      tabTextStyle={styles.tabText}
      activeTabTextStyle={styles.activeTabText}
      tabStyle={styles.tab}
      activeTabStyle={styles.activeTab}
    />
    <View style={styles.iconsContainer}>
      <IconButton
        name="star"
        onClick={onSavedSearchModal}
        style={styles.iconButton}
      />
      <IconButton
        name="magnifying-glass"
        onClick={onSearchModal}
        badge
        style={styles.iconButton}
      />
    </View>
  </View>
)

TopBar.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  onTabChanged: PropTypes.func.isRequired,
  onSearchModal: PropTypes.func.isRequired,
  onSavedSearchModal: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    padding: 18,
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabsContainer: {
    width: 120,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    height: 37,
    borderRadius: 18,
  },
  tabText: {
    color: colors.black1,
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tab: {
    height: 37,
    borderWidth: 0,
    backgroundColor: colors.white,
    borderColor: colors.transparent,
  },
  activeTab: {
    height: 37,
    borderWidth: 0,
    backgroundColor: colors.pink1,
    borderColor: colors.transparent,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconsContainerEmpty: {
    flexDirection: 'row',
    opacity: 0,
  },
  iconButton: {
    marginLeft: 5,
    marginRight: 5,
  },
})

export default TopBar
