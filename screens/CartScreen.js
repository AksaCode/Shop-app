import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import CustomButton from '../components/CustomButton';
import CartList from '../components/CartList';
//import { addOrder } from '../store/action/order';
//import { orderActions } from '../ReduxToolkit/order';
import { addOrder } from '../ReduxToolkit/order';
import { restartOrder } from '../ReduxToolkit/cartReducer';

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const cartState = { total: total, cart: cart };
  const dispatch = useDispatch();
  const executeOrder = (orderItem) => {
    dispatch(addOrder(orderItem));
    dispatch(restartOrder(orderItem));
  };

  const orderAlert = () => {
    Alert.alert('Empty cart', 'Select your products!', [
      {
        text: 'Go back',
        onPress: () => {
          props.navigation.navigate({
            routeName: 'Products',
          });
        },
      },
    ]);
  };

  return (
    <View>
      <View style={styles.pos}>
        <View style={styles.shadow}>
          <View style={styles.container}>
            <Text>Total: {total} $</Text>
            <View>
              <CustomButton
                title="Order now"
                action={() => {
                  total === 0 ? orderAlert() : executeOrder(cartState);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <CartList data={cart} />
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-arrow-back"
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default CartScreen;

const styles = StyleSheet.create({
  pos: { alignItems: 'center', justifyContent: 'center' },
  shadow: { width: '90%', borderRadius: 10, marginVertical: 20 },
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: 'red',
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
