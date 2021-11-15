import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';

const EditProductScreen = (props) => {
  const availableProd = useSelector((state) => state.products.products);
  const prodId = props.navigation.getParam('productId');
  const selectedProduct = availableProd.find((product) => product.id === prodId);

  const [text, setText] = useState('');
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="useless placeholder"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
    height: 50,
    margin: 15,
    textAlign: 'center',
  },
});
