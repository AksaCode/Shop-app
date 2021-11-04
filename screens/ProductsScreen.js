import React from 'react';
import { Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { PRODUCTS } from '../data/dummy-data';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const renderProductsItem = (itemData) => <Text>{itemData.item.title}</Text>;

  return <FlatList data={PRODUCTS} renderItem={renderProductsItem} numColumns={1} />;
};

export default ProductsList;
