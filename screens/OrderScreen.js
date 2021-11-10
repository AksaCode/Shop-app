import React from 'react';
import { View } from 'react-native';

import OrderList from '../components/OrderList';

const OrderScreen = (props) => {
  return (
    <View>
      <OrderList />
    </View>
  );
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
