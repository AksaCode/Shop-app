import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardDetail = ({ title, price }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 15,
    fontFamily: 'open-sans',
  },
});
