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
import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './store/reducer/products';
// import cartReducer from './store/reducer/cartReducer';
import orderReducer from './store/reducer/orderReducer';
import authReducer from './store/reducer/auth';
import NavigationContainer from './navigation/NavigationContainer';
import cartReducer from '../Shop-app/ReduxToolkit/cartReducer';
import ProductsNavigator from './navigation/ProductsNavigator';

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

const store = createStore(rootReducer, composeWithDevTools(), applyMiddleware(ReduxThunk));
const storeToolkit = configureStore({
  reducer: {cart: cartReducer},
});

export default function App(props) {
  const [fonts, setFonts] = useState(false);
  if (!fonts) {
    return <AppLoading startAsync={fontFetch} onFinish={() => setFonts(true)} onError={(err) => console.log(err)} />;
  }

  return (
    <Provider store={storeToolkit}>
      <SafeAreaView style={styles.container}>
        <ProductsNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
