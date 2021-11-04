import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from './CustomButton';

const RowButtons = (props) => {
  return (
    <View style={styles.content}>
      <CustomButton title="details" action={props.onViewDetail} />
      <CustomButton title="cart" action={props.onAddToCart} />
    </View>
  );
};

export default RowButtons;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  },
});
