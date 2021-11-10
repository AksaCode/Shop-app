import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';

import CustomButton from './CustomButton';
import RowButtons from './RowButtons';

const OrderItem = ({ productPrice, date }) => {
  return (
    <View style={styles.primaryCon}>
      <View style={styles.container}>
        <Text style={styles.price}>${productPrice}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton title="SHOW DETAILS" action={() => {}} />
      </View>
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
