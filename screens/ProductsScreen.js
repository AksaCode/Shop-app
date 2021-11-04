import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import CardWrapper from '../components/CardWrapper';
import { addProduct } from '../store/action/cart';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  const renderProductsItem = (itemData) => (
    <View>
      <CardWrapper
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onAddToCart={() => onAddToCart(itemData.item)}
      />
    </View>
  );

  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

export default ProductsList;
