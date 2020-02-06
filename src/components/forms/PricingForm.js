import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text, Input, Icon } from 'react-native-elements'

import IconButton from '../Buttons/IconButton'
import theme from '../../config/theme'

const PricingItem = ({ price, onChange, showDelete, onDelete }) => (
  <View style={styles.itemContainer}>
    <Input
      keyboardType="decimal-pad"
      value={price.value}
      onChangeText={text => {
        let newText = '£'
        let numbers = '0123456789.'

        for (let i = 0; i < text.length; i++) {
          if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i]
          }
        }

        onChange('value', newText)
      }}
      containerStyle={styles.price}
      inputStyle={styles.priceText}
      inputContainerStyle={styles.inputContainer}
    />

    <Input
      value={price.description}
      placeholder="e.g. 'Student discount'"
      containerStyle={styles.desc}
      onChangeText={text => {
        onChange('description', text)
      }}
      inputStyle={
        price.description === '' ? styles.descText : styles.descTextActive
      }
      inputContainerStyle={styles.inputContainer}
    />
    {showDelete && (
      <Icon
        name="ios-close"
        type="ionicon"
        color={theme.colors.primary}
        onPress={onDelete}
        size={35}
        containerStyle={styles.icon}
      />
    )}
  </View>
)

PricingItem.propTypes = {
  price: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  showDelete: PropTypes.bool,
  onDelete: PropTypes.func,
}

PricingItem.defaultProps = {
  showDelete: false,
  onDelete: () => {},
}

const PricingForm = ({
  prices,
  onAddPrice,
  onDeleteItem,
  onChangePriceItem,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>PRICING</Text>
    <PricingItem
      price={prices[0]}
      onChange={(key, value) => {
        onChangePriceItem({ index: 0, key, value })
      }}
    />
    {prices.map((item, index) =>
      index === 0 ? null : (
        <PricingItem
          price={item}
          onChange={(key, value) => {
            onChangePriceItem({ index, key, value })
          }}
          onDelete={onDeleteItem}
          key={index}
          showDelete
        />
      )
    )}
    <IconButton
      name="plus"
      color={theme.colors.secondary}
      onClick={onAddPrice}
      style={styles.addIcon}
      size={20}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    display: 'flex',
    paddingHorizontal: 5,
    marginVertical: 10,
    height: 30,
  },
  price: {
    width: '25%',
    paddingVertical: 0,
    marginVertical: 0,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginLeft: 0,
  },
  desc: {
    paddingVertical: 0,
    flex: 1,
    marginLeft: 5,
    marginVertical: 0,
  },
  descText: {
    fontSize: 14,
    color: theme.colors.secondary,
    opacity: 0.5,
    fontStyle: 'italic',
    marginLeft: 3,
  },
  descTextActive: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 0,
    paddingVertical: 0,
    height: 30,
  },
  addIcon: {
    marginVertical: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputContainer: {
    height: 23,
  },
})

PricingForm.propTypes = {
  prices: PropTypes.array.isRequired,
  onAddPrice: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onChangePriceItem: PropTypes.func.isRequired,
}

export default PricingForm
