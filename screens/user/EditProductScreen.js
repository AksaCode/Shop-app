import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));

  const [value, onChangeText] = useState({
    title: editedProduct ? editedProduct.title : '',
    url: editedProduct ? editedProduct.imageUrl : '',
    description: editedProduct ? editedProduct.description : '',
    price: '',
  });

  return (
    <View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        id="title"
        label="Title"
        placeholder="Title"
        onChangeText={(value) => onChangeText(value)}
        value={value.title}
        required
      />
      <Text style={styles.label}>Image Url</Text>
      <TextInput
        style={styles.input}
        id="urlImage"
        label="Url"
        placeholder="Url"
        keyboardType="default"
        onChangeText={(value) => onChangeText(value)}
        value={value.url}
        required
      />
      {editedProduct ? null : (
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            label="Price"
            placeholder="Price"
            onChangeText={(value) => onChangeText(value)}
            keyboardType="decimal-pad"
            required
            min={0.2}
          />
        </View>
      )}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        id="description"
        label="Description"
        placeholder="Description"
        keyboardType="default"
        onChangeText={(value) => onChangeText(value)}
        value={value.description}
        required
      />
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Checkout" iconName="md-checkmark" onPress={() => {}} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    height: 50,
    marginHorizontal: 15,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginHorizontal: 15,
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EditProductScreen;
