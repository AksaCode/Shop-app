import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { PRODUCTS } from '../data/dummy-data';

const DetailsProductScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = PRODUCTS.find((product) => product.id === productId);
  return (
    <View style={styles.screen}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

DetailsProductScreen.navigationOptions = (navigationData) => {
  const productId = navigationData.navigation.getParam('productId');
  const selectedProduct = PRODUCTS.find((product) => product.id === productId);
  return {
    headerTitle: selectedProduct.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsProductScreen;
