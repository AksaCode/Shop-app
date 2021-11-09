import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import DetailsProductScreen from '../screens/DetailsProductScreen';
import OrderScreen from '../screens/OrderScreen';

const ProductsNavigator = createStackNavigator({
  Products: ProductsScreen,
  Details: OrderScreen,
  Cart: CartScreen,
});

export default createAppContainer(ProductsNavigator);
