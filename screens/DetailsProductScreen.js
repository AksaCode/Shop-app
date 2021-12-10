import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import HeaderButton from '../components/HeaderButton';
import { addProduct } from '../store/action/cart';

const DetailsProductScreen = (props) => {
  const availableProducts = useSelector((state) => state.products.products);
  const productId = props.navigation.getParam('productId');
  let selectedProduct = availableProducts.find((product) => product.id === productId);
  if (selectedProduct === undefined) selectedProduct = {};
  const dispatch = useDispatch();
  const onAddToCart = (selectedProduct) => {
    dispatch(addProduct(selectedProduct));
  };

  useEffect(() => {
    props.navigation.setParams({
      productTitle: selectedProduct.title,
    });
  }, [selectedProduct]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.buttonStyles}>
        <CustomButton title="ADD TO CART" action={() => onAddToCart(selectedProduct)} />
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
        <Item
          title="Menu"
          iconName="md-arrow-back"
          onPress={() => {
            navigationData.navigation.navigate({ routeName: 'Products' });
          }}
        />
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
    color: '#d3d3d3',
  },
  descriptionStyles: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
});

export default DetailsProductScreen;
