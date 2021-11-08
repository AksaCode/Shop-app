import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DetailsProductsScreen from '../screens/DetailsProductScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';

const ProductsNavigator = createStackNavigator({
  Products: ProductsScreen,
  Details: DetailsProductsScreen,
  Cart: CartScreen,
});

export default createAppContainer(ProductsNavigator);
