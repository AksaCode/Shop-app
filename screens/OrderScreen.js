import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import OrderList from '../components/OrderList';
import HeaderButton from '../components/HeaderButton';
import EmptyOrder from '../components/EmptyOrder';

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return <View>{orders.length === 0 ? <EmptyOrder /> : <OrderList />}</View>;
};
export default OrderScreen;
