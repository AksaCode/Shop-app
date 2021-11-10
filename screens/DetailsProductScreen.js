import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomButton from '../components/CustomButton';
import HeaderButton from '../components/HeaderButton';

const DetailsProductScreen = (props) => {
  const availableProducts = useSelector((state) => state.products.products);
  const productId = props.navigation.getParam('productId');
  const selectedProduct = availableProducts.find((product) => product.id === productId);

  useEffect(() => {
    props.navigation.setParams({ productTitle: selectedProduct.title });
  }, [selectedProduct]);

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
  const productTitle = navigationData.navigation.getParam('productTitle');

  return {
    headerTitle: productTitle,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navigationData.navigation.toggleDrawer()
        }} />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navigationData.navigation.navigate({ routeName: 'Cart' });
          }}
        />
      </HeaderButtons>
    ),
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
