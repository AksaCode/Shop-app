import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';

import { PRODUCTS } from '../data/dummy-data';

const DetailsProductScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = PRODUCTS.find((product) => product.id === productId);
  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.buttonStyles}>
        <CustomButton title="ADD TO CART" />
      </View>
      <Text style={styles.priceStyles}>${selectedProduct.price}</Text>
      <Text style={styles.descriptionStyles}>{selectedProduct.description}</Text>
    </ScrollView>
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
  image: {
    width: '100%',
    height: 300,
  },
  buttonStyles: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceStyles: {
    fontSize: 30,
    fontFamily: 'open-sans',
    textAlign: 'center',
    paddingTop: 20,
  },
  descriptionStyles: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 50,
  },
});

export default DetailsProductScreen;
