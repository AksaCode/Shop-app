import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import CardWrapper from '../components/CardWrapper';
import { addProduct } from '../store/action/cart';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const renderProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      onAddToCart={() => onAddToCart(itemData.item)}
      onViewDetail={() => {
        props.navigation.navigate({
          routeName: 'Details',
          params: {
            productId: itemData.item.id,
          },
        });
      }}
    />
  );

  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

export default ProductsList;
