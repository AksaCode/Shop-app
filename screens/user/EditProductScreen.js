import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import { addP } from '../../store/action/product';
import { editProduct } from '../../store/action/product';

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === productId));
  console.log(editedProduct);
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [url, setUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const addProductHandler = useCallback(() => {
    dispatch(addP(title, url, description, price));
  }, [dispatch, title, url, description, price]);

  const editProductHandler = useCallback(() => {
    dispatch(editProduct(productId, 'u1', title, description, url));
  }, [dispatch, productId, title, description, url]);

  useEffect(() => {
    props.navigation.setParams({
      addProduct: addProductHandler,
      editProduct: editProductHandler,
      editedProduct: editedProduct,
    });
  }, [addProductHandler]);

  return (
    <View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        id="title"
        label="Title"
        placeholder="Title"
        onChangeText={(title) => setTitle(title)}
        value={title}
        required
      />
      <Text style={styles.label}>Image Url</Text>
      <TextInput
        style={styles.input}
        id="urlImage"
        label="Url"
        placeholder="Url"
        keyboardType="default"
        onChangeText={(url) => setUrl(url)}
        value={url}
        required
      />
      {editedProduct ? null : (
        <View>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            label="Price"
            placeholder="Price"
            onChangeText={(price) => setPrice(price)}
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
        onChangeText={(description) => setDescription(description)}
        value={description}
        required
      />
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const addNewProduct = navData.navigation.getParam('addProduct');
  const editSelectedProduct = navData.navigation.getParam('editProduct');
  const editedProduct = navData.navigation.getParam('editedProduct');
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Checkout"
          iconName="md-checkmark"
          onPress={() => {
            editedProduct ? editSelectedProduct() : addNewProduct();
            navData.navigation.goBack();
          }}
        />
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
