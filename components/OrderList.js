import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import OrderItem from './OrderItem';

const OrderList = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const renderOrder = (itemData) => (
    <OrderItem
      order={itemData.item}
      productPrice={itemData.item.totalAmount}
      date={itemData.item.date}
      length={itemData.length}
    />
  );

  return <FlatList data={orders} renderItem={renderOrder} numColumn={1} />;
};

export default OrderList;
