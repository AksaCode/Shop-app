import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";

import DetailsProductsScreen from '../screens/DetailsProductScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import Colors from '../constants/Colors';


const defaultStackOptions={
  headerTitlesStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.accentColor};


const ProductsNavigator = createStackNavigator({
  
  Products: ProductsScreen,
  Details: DetailsProductsScreen,
  Cart: CartScreen,
  
}, { defaultNavigationOptions : defaultStackOptions} );

const OrderScreenNavigator = createStackNavigator({
  Order: OrderScreen,
},{ defaultNavigationOptions : defaultStackOptions} );

const MainNavigator = createDrawerNavigator({
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      drawerLabel: 'Products',
      drawerIcon: drawerConfig => (
        <Ionicons name='cart-sharp'  iconSize={30} color={drawerConfig.tintColor} />
      )
    
    },
    
  },
  Order: {
    screen: OrderScreenNavigator,
    navigationOptions: {
      drawerLabel: 'Orders',
      drawerIcon: drawerConfig => (
        <Ionicons name='list-sharp'  size={20} color={drawerConfig.tintColor} />
      )
    }},
}, {
  contentOptions: {
    labelStyle:{
      fontFamily: 'open-sans',
    
    },
    activeTintColor: Colors.primaryColor
  }

});

export default createAppContainer(MainNavigator);
