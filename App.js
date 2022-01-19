import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ReduxToolkit/products';
import cartReducer from './ReduxToolkit/cartReducer';
import authReducer from './ReduxToolkit/auth';
import orderReducer from './ReduxToolkit/order';

const fontFetch = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

const storeToolkit = configureStore({
  reducer: { cart: cartReducer, products: productsReducer, auth: authReducer, orders: orderReducer },
});

const store = createStore(rootReducer, composeWithDevTools(), applyMiddleware(ReduxThunk));

export default function App(props) {
  const [fonts, setFonts] = useState(false);
  if (!fonts) {
    return <AppLoading startAsync={fontFetch} onFinish={() => setFonts(true)} onError={(err) => console.log(err)} />;
  }

  return (
    <Provider store={storeToolkit}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
