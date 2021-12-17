import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Item } from 'react-navigation-header-buttons';
import { HeaderButtons } from 'react-navigation-header-buttons';

import OrderList from '../components/OrderList';
import HeaderButton from '../components/HeaderButton';
import EmptyOrder from '../components/EmptyOrder';
//import * as ordersActions from '../store/action/order';
import Colors from '../constants/Colors';
import LoadingComponent from '../components/LoadingComponent';
//import { orderActions } from '../ReduxToolkit/order';
import { fetchOrders } from '../ReduxToolkit/order';

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <LoadingComponent />;
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
