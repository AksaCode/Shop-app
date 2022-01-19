import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import ProductsScreen, { screenOptions as productsScreenOptions } from '../screens/ProductsScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/CartScreen';
import OrderScreen, { screenOptions as orderScreenOptions } from '../screens/OrderScreen';
import DetailsProductScreen, { screenOptions as productDetailScreenOptions } from '../screens/DetailsProductScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import { logout } from '../ReduxToolkit/auth';

const defaultStackOptions = {
  headerTintColor: '#191970',
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

// const ProductsNavigator = createStackNavigator(
//   {
//     Products: ProductsScreen,
//     Details: DetailsProductScreen,
//     Cart: CartScreen,
//     Edit: EditProductScreen,
//   },
//   { defaultNavigationOptions: defaultStackOptions },
// );
// const OrderScreenNavigator = createStackNavigator(
//   {
//     Order: OrderScreen,
//   },
//   { defaultNavigationOptions: defaultStackOptions },
// );
// const UserScreenNavigator = createStackNavigator(
//   {
//     User: UserProductsScreen,
//     Edit: EditProductScreen,
//   },
//   { defaultNavigationOptions: defaultStackOptions },
// );
// const MainNavigator = createDrawerNavigator(
//   {
//     Products: {
//       screen: ProductsNavigator,
//       navigationOptions: {
//         drawerLabel: 'Products',
//         drawerIcon: (drawerConfig) => <Ionicons name="cart-sharp" iconSize={30} color={drawerConfig.tintColor} />,
//       },
//     },
//     Order: {
//       screen: OrderScreenNavigator,
//       navigationOptions: {
//         drawerLabel: 'Orders',
//         drawerIcon: (drawerConfig) => <Ionicons name="list-sharp" size={20} color={drawerConfig.tintColor} />,
//       },
//     },
//     User: {
//       screen: UserScreenNavigator,
//       navigationOptions: {
//         drawerLabel: 'User',
//         drawerIcon: (drawerConfig) => <Ionicons name="md-create" size={20} color={drawerConfig.tintColor} />,
//       },
//     },
//   },
//   {
//     contentOptions: {
//       labelStyle: {
//         fontFamily: 'open-sans',
//       },
//       activeTintColor: Colors.primaryColor,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//             <DrawerItems {...props} />
//             <Button
//               title="logout"
//               color={Colors.primaryColor}
//               onPress={() => {
//                 dispatch(logout());
//                 props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   },
// );
// const AuthNavigator = createStackNavigator({
//   Auth: AuthScreen,
// });

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigatorFunc = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <ProductsStackNavigator.Screen name="Products" component={ProductsScreen} options={productsScreenOptions} />
      <ProductsStackNavigator.Screen
        name="Details"
        component={DetailsProductScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
      <ProductsStackNavigator.Screen name="Edit" component={EditProductScreen} options={editProductScreenOptions} />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrderScreenNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <OrdersStackNavigator.Screen name="Orders" component={OrderScreen} options={orderScreenOptions} />
    </OrdersStackNavigator.Navigator>
  );
};

const UserStackNavigator = createStackNavigator();

export const UserScreenNavigator = () => {
  return (
    <UserStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <UserStackNavigator.Screen name="User" component={UserProductsScreen} options={userProductsScreenOptions} />
      <UserStackNavigator.Screen name="Edit" component={EditProductScreen} options={editProductScreenOptions} />
    </UserStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="logout"
                color={Colors.primaryColor}
                onPress={() => {
                  dispatch(logout());
                  //props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'open-sans',
        },
        activeTintColor: Colors.primaryColor,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigatorFunc}
        options={{
          drawerLabel: 'Products',
          drawerIcon: (props) => <Ionicons name="cart-sharp" iconSize={30} color={props.color} />,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Order"
        component={OrderScreenNavigator}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: (props) => <Ionicons name="list-sharp" size={20} color={props.color} />,
        }}
      />
      <ShopDrawerNavigator.Screen
        name="User"
        component={UserScreenNavigator}
        options={{
          drawerLabel: 'User',
          drawerIcon: (props) => <Ionicons name="md-create" size={20} color={props.color} />,
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
    </AuthStackNavigator.Navigator>
  );
};

// const LoginNavigator = createSwitchNavigator({
//   Auth: AuthNavigator,
//   Shop: MainNavigator,
// });

// export default createAppContainer(LoginNavigator);
