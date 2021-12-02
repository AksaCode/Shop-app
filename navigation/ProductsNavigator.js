import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import OrderScreen from '../screens/OrderScreen';
import DetailsProductScreen from '../screens/DetailsProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import EditProductScreen from '../screens/user/EditProductScreen';

const defOptions = {
  headerTintColor: Colors.accentColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const Stack1 = createStackNavigator();

const ProductNavigator = (props) => (
  <Stack1.Navigator>
    <Stack1.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        ...defOptions,
        headerRight: () => (
          <View>
            <Ionicons
              name="md-cart"
              size={25}
              color={Colors.accentColor}
              onPress={() => props.navigation.navigate('Cart')}
            />
          </View>
        ),
        headerLeft: () => (
          <View>
            <Ionicons
              name="ios-menu"
              size={25}
              color={Colors.accentColor}
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          </View>
        ),
      }}
    />
    <Stack1.Screen
      name="Details"
      component={DetailsProductScreen}
      options={{
        ...defOptions,
        headerRight: () => (
          <View>
            <Ionicons name="md-cart" size={25} color="red" onPress={() => props.navigation.navigate('Cart')} />
          </View>
        ),
        headerLeft: () => (
          <View>
            <Ionicons
              name="md-arrow-back"
              color={Colors.accentColor}
              size={25}
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
        ),
      }}
    />
    <Stack1.Screen
      name="Cart"
      component={CartScreen}
      options={{
        ...defOptions,
        headerLeft: () => (
          <View>
            <Ionicons
              name="md-arrow-back"
              color={Colors.accentColor}
              size={25}
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
        ),
      }}
    />
    <Stack1.Screen
      name="Edit"
      component={EditProductScreen}
      options={{
        ...defOptions,
      }}
    />
  </Stack1.Navigator>
);

const Stack2 = createStackNavigator();
const OrderScreenNavigator = (props) => (
  <Stack2.Navigator>
    <Stack2.Screen
      name="Order"
      component={OrderScreen}
      options={{
        ...defOptions,
        headerLeft: () => (
          <View>
            <Ionicons
              name="ios-menu"
              size={25}
              color={Colors.accentColor}
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            />
          </View>
        ),
      }}
    />
  </Stack2.Navigator>
);

const Stack3 = createStackNavigator();

const UserScreenNavigator = ({ navigation, route }) => (
  <Stack3.Navigator>
    <Stack3.Screen
      name="User"
      component={UserProductsScreen}
      options={{
        ...defOptions,
        headerLeft: () => (
          <View>
            <Ionicons
              name="ios-menu"
              size={25}
              color={Colors.accentColor}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </View>
        ),
      }}
    />
    <Stack3.Screen
      name="Edit"
      component={EditProductScreen}
      options={{
        ...defOptions,
      }}
    />
  </Stack3.Navigator>
);

const StackRounded = createStackNavigator();
const RounderNavigator = () => (
  <StackRounded.Navigator headerMode="none">
    <StackRounded.Screen name="ProductNavigator" component={ProductNavigator} />
    <StackRounded.Screen
      name="OrderScreenNavigator"
      component={OrderScreenNavigator}
      options={{
        ...defOptions,
      }}
    />
    <StackRounded.Screen
      name="UserScreenNavigator"
      component={UserScreenNavigator}
      options={{
        ...defOptions,
      }}
    />
  </StackRounded.Navigator>
);

const Drawer = createDrawerNavigator();
const MainNavigator = () => (
  <Drawer.Navigator initialRouteName="Products">
    <Drawer.Screen name="Products" component={ProductNavigator} />
    <Drawer.Screen name="Order" component={OrderScreenNavigator} />
    <Drawer.Screen name="User" component={UserScreenNavigator} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="MainNavigator" component={MainNavigator} />
    <RootStack.Screen name="RoundedNavigator" component={RounderNavigator} />
  </RootStack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
