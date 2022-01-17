import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomButton from '../components/CustomButton';
import HeaderButton from '../components/HeaderButton';
import { addProduct } from '../ReduxToolkit/cartReducer';
import Colors from '../constants/Colors';

const DetailsProductScreen = (props) => {
  const productId = props.route.params ? props.route.params.productId : null;
  const selectedProduct = useSelector((state) => state.products.products.find((prod) => prod.id === productId));
  if (selectedProduct === undefined) selectedProduct = {};
  const dispatch = useDispatch();
  const onAddToCart = (selectedProduct) => {
    dispatch(addProduct(selectedProduct));
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: selectedProduct.title,
    });
  }, [props.navigation, selectedProduct]);

  return (
    <ScrollView>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/yellow-header-banner-design_1302-16784.jpg?size=626&ext=jpg',
        }}
        style={{ height: 100 }}
      />
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.buttonStyles}>
        <CustomButton title="ADD TO CART" action={() => onAddToCart(selectedProduct)} color={Colors.primaryColor} />
      </View>
      <Text style={styles.priceStyles}>${selectedProduct.price}</Text>
      <Text style={styles.descriptionStyles}>Description:</Text>
      <Text style={styles.descriptionStyles}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navigationData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-arrow-back"
          onPress={() => {
            navigationData.navigation.navigate('Products');
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
            navigationData.navigation.navigate('Cart');
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
    height: 300,
    margin: 15,
    padding: 10,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
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
    paddingBottom: 20,
    color: Colors.accentColor,
  },
  descriptionStyles: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'left',
    paddingHorizontal: 15,
  },
});

export default DetailsProductScreen;
