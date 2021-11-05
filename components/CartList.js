import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import CartProduct from './CartProduct';

const CartList = (props) => {
  const cart = useSelector((state) => state.cart.items);
  const renderCart = (itemData) => <CartProduct productName={itemData.item.title} productPrice={itemData.item.price} />;

  return <FlatList data={cart} renderItem={renderCart} numColumn={1} />;
};

export default CartList;
