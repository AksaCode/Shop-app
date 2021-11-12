import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import moment from 'moment';
import CustomButton from './CustomButton';
import RowButtons from './RowButtons';
import CartList from './CartList';

const OrderItem = ({ order }) => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.primaryCon}>
      <View style={styles.container}>
        <Text style={styles.price}>${order.totalAmount}</Text>
        <Text style={styles.date}>{moment(order.date).format('MMMM Do YYYY, h:mm')}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton title={active ? 'HIDE DETAILS' : 'SHOW DETAILS'} action={() => setActive(!active)} />
      </View>
      {active ? <CartList data={order.items} active={active} /> : null}
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
    color: '#d3d3d3',
  },
});
