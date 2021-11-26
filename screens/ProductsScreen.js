import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addProduct } from '../store/action/cart';
import CardWrapper from '../components/CardWrapper';
import RowButtons from '../components/RowButtons';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const renderProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      cardAction={() => {
        props.navigation.push('Details');
      }}
    >
      <RowButtons
        rightAction={() => onAddToCart(itemData.item)}
        leftAction={() => {
          props.navigation.navigate('Details', { productId: itemData.item.id });
        }}
        leftTitle="details"
        rightTitle="cart"
      />
    </CardWrapper>
  );

  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

export default ProductsList;
