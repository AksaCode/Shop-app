import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';

const DetailsProductScreen = (props) => {
  const availableProducts = useSelector(state => state.products.products);
  const productId = props.navigation.getParam('productId');
  const selectedProduct = availableProducts.find(product => product.id === productId);

  useEffect(() => {
    props.navigation.setParams({productTitle: selectedProduct.title});
  }, [selectedProduct]); 

  return (
    <View style={styles.screen}>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

DetailsProductScreen.navigationOptions = navigationData => {
  const productId = navigationData.navigation.getParam('productId');
  const productTitle = navigationData.navigation.getParam('productTitle');

  return {
    headerTitle: productTitle
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
