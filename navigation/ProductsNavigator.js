import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import DetailsProductScreen from '../screens/DetailsProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
// import * as authActions from '../store/action/auth';
import { logout } from '../ReduxToolkit/auth';

const defaultStackOptions = {
  headerTintColor: Colors.accentColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsScreen,
    Details: DetailsProductScreen,
    Cart: CartScreen,
    Edit: EditProductScreen,
  },
  { defaultNavigationOptions: defaultStackOptions },
);

const OrderScreenNavigator = createStackNavigator(
  {
    Order: OrderScreen,
  },
  { defaultNavigationOptions: defaultStackOptions },
);

const UserScreenNavigator = createStackNavigator(
  {
    User: UserProductsScreen,
    Edit: EditProductScreen,
  },
  { defaultNavigationOptions: defaultStackOptions },
);

const MainNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerLabel: 'Products',
        drawerIcon: (drawerConfig) => <Ionicons name="cart-sharp" iconSize={30} color={drawerConfig.tintColor} />,
      },
    },
    Order: {
      screen: OrderScreenNavigator,
      navigationOptions: {
        drawerLabel: 'Orders',
        drawerIcon: (drawerConfig) => <Ionicons name="list-sharp" size={20} color={drawerConfig.tintColor} />,
      },
    },
    User: {
      screen: UserScreenNavigator,
      navigationOptions: {
        drawerLabel: 'User',
        drawerIcon: (drawerConfig) => <Ionicons name="md-create" size={20} color={drawerConfig.tintColor} />,
      },
    },
  },
  {
    contentOptions: {
      labelStyle: {
        fontFamily: 'open-sans',
      },
      activeTintColor: Colors.primaryColor,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="logout"
              color={Colors.primaryColor}
              onPress={() => {
                dispatch(logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  },
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const LoginNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: MainNavigator,
});

export default createAppContainer(LoginNavigator);
