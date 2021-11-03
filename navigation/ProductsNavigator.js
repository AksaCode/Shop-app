import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DetailsProductsScreen from '../screens/DetailsProductScreen';
import ProductsScreen from '../screens/ProductsScreen';

const ProductsNavigator = createStackNavigator({
  Products: ProductsScreen,
  Details: DetailsProductsScreen,
});

export default createAppContainer(ProductsNavigator);
