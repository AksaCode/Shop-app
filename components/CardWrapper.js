import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import CardDetail from './CardDetail';

const CardWrapper = ({ image, title, price, cardAction, children }) => {
  return (
    <View style={styles.align}>
      <TouchableOpacity onPress={cardAction} style={styles.wrap}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <CardDetail title={title} price={price} />
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default CardWrapper;

const styles = StyleSheet.create({
  align: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  wrap: {
    width: '90%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230, 0.1)',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height: 200 },
});
