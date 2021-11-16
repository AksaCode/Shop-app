import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

  const [value, onChangeText] = useState(editedProduct ? editedProduct.title : '');

  return (
    <View style={styles.input}>
      <TextInput
        id="title"
        label="Title"
        errorText="Please enter a valid title!"
        keyboardType="default"
        onChangeText={(value) => onChangeText(value)}
        value={value}
        required
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
