import React from 'react';
import { View } from 'react-native';
import { Item } from 'react-navigation-header-buttons';
import { HeaderButtons } from 'react-navigation-header-buttons';

import OrderList from '../components/OrderList';
import HeaderButton from '../components/HeaderButton';

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
