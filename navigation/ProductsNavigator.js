import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import DetailsProductsScreen from '../screens/DetailsProductScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';

const ProductsNavigator = createStackNavigator({
  Cart: CartScreen,
  Products: ProductsScreen,
  Details: DetailsProductsScreen,
  
});

const OrderScreenNavigator = createStackNavigator({
  Order: OrderScreen,
});

const MainNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Order: OrderScreenNavigator,
});

export default createAppContainer(MainNavigator);
