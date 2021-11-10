import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import DetailsProductScreen from '../screens/DetailsProductScreen';

const ProductsNavigator = createStackNavigator({
  Products: ProductsScreen,
  Details: DetailsProductScreen,
  Cart: CartScreen,
});

export default createAppContainer(ProductsNavigator);
