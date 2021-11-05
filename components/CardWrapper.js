import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import RowButtons from './RowButtons';
import CardDetail from './CardDetail';

const CardWrapper = ({ image, title, price, onViewDetail, onAddToCart }) => {
  return (
    <View style={styles.align}>
      <TouchableOpacity onPress={onViewDetail} style={styles.wrap}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <CardDetail title={title} price={price} />
        <RowButtons onViewDetail={onViewDetail} onAddToCart={onAddToCart} />
      </TouchableOpacity>
    </View>
  );
};

export default CardWrapper;

const styles = StyleSheet.create({
  align: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  wrap: {
    width: '90%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: 200 },
});
