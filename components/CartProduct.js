import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { deleteProduct } from '../store/action/cart';

const CartProduct = ({ productName, productPrice, id, count }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <View style={styles.pos}>
      <View style={styles.wrap}>
        <View style={styles.left}>
          <Text style={{ marginRight: 5, fontStyle: 'italic' }}>{count}</Text>
          <Text>{productName}</Text>
        </View>
        <View style={styles.right}>
          <Text style={{ marginRight: 10 }}>${productPrice}</Text>
          <Ionicons
            name="md-trash"
            size={20}
            color="red"
            onPress={() => {
              deleteItem(id);
            }}
          />
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
