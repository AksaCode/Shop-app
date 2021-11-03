import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducer/products';

const rootReducer = combineReducers(
{
  products: productsReducer,
});

const store = createStore(rootReducer);

import ProductsNavigator from './navigation/ProductsNavigator';

export default function App() {

 
  return (
      <Provider store={store}>
      <ProductsNavigator />
      </Provider>
    
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

