import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomButton from '../components/CustomButton';
import CartList from '../components/CartList';


const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  return (
    <>
      <View style={styles.pos}>
        <View style={styles.shadow}>
          <View style={styles.container}>
            <Text>Total: {total} $</Text>
            <View>
              <CustomButton title="Order now" />
            </View>
          </View>
        </View>
      </View>
      <CartList navigation={props.navigation}/>
    </>
  );
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
