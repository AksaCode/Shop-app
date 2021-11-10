import React from 'react';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Text, View} from 'react-native';

import HeaderButton from '../components/HeaderButton';

const OrderScreen = props => {
  return (
    <View>
      <Text>Cao</Text>
    </View>
  );
  
};

OrderScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName="ios-menu" onPress={() => {
            navData.navigation.toggleDrawer()
          }} />
        </HeaderButtons>
      )
      
    };
  };

export default OrderScreen;
