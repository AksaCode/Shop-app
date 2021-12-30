import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import CustomButton from './CustomButton';
import CartList from './CartList';
import Colors from '../constants/Colors';

const OrderItem = ({ order }) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.primaryCon}>
      <View style={styles.container}>
        <Text style={styles.price}>${order.totalAmount}</Text>
        <Text style={styles.date}>{moment(order.date).format('MMMM Do YYYY, h:mm')}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton
          title={active ? 'HIDE DETAILS' : 'SHOW DETAILS'}
          action={() => setActive(!active)}
          color={Colors.primaryColor}
        />
      </View>
      <View style={styles.cartList}>{active ? <CartList data={order.cartItems} active={active} /> : null}</View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  primaryCon: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: '#d3d3d3',
    borderRadius: 15,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  date: {
    fontSize: 15,
    color: Colors.primaryColor,
  },
  cartList: {
    paddingHorizontal: 20,
  },
});
