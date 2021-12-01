import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Item } from 'react-navigation-header-buttons';
import { HeaderButtons } from 'react-navigation-header-buttons';

import OrderList from '../components/OrderList';
import HeaderButton from '../components/HeaderButton';
import EmptyOrder from '../components/EmptyOrder';

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  return <View>{orders.length === 0 ? <EmptyOrder output="There are no orders." /> : <OrderList />}</View>;
};
OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrderScreen;
