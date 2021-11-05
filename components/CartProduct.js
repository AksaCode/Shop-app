import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartProduct = ({ productName, productPrice }) => {
  return (
    <View style={styles.pos}>
      <View style={styles.wrap}>
        <Text>{productName}</Text>
        <View style={styles.right}>
          <Text style={{ marginRight: 10 }}>${productPrice}</Text>
          <Ionicons name="md-trash" size={20} color="red" />
        </View>
      </View>
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  pos: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  wrap: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
