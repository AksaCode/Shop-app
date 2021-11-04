import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import CardWrapper from '../components/CardWrapper';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const renderProductsItem = (itemData) => (
    <View>
      <CardWrapper image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onViewDetail={()=>{
        props.navigation.navigate({routeName: 'Details', params: {
          productId: itemData.item.id
        }})
      }} />
    </View>
  );
  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

export default ProductsList;
