import React, { useState, useEffect, useCallback, useReducer, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import Input from '../../components/Input';
import { addNewProduct } from '../../store/action/product';
import { editProduct } from '../../store/action/product';
import Colors from '../../constants/Colors';

const FORM_INPUT_CHANGES = 'FORM_INPUT_CHANGES';

const reactReducer = (state, action) => {
  if (action.type === FORM_INPUT_CHANGES) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  //const productId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === productId));
  console.log(editedProduct);
  const dispatch = useDispatch();

  const [restOfFormState, dispatchRestOfFormState] = useReducer(reactReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      description: editedProduct ? editedProduct.description : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const addProductHandler = useCallback(() => {
    if (!restOfFormState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
      return;
    }
    dispatch(
      addNewProduct(
        restOfFormState.inputValues.title,
        restOfFormState.inputValues.imageUrl,
        restOfFormState.inputValues.description,
        restOfFormState.inputValues.price,
      ),
    );
  }, [dispatch, restOfFormState]);

  const editProductHandler = useCallback(() => {
    if (!restOfFormState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
      return;
    }
    dispatch(
      editProduct(
        productId,
        'u1',
        restOfFormState.inputValues.title,
        restOfFormState.inputValues.description,
        restOfFormState.inputValues.imageUrl,
      ),
    );
  }, [dispatch, productId, restOfFormState]);

  useEffect(() => {
    navigation.setParams({
      addProduct: addProductHandler,
      editProduct: editProductHandler,
      editedProduct: editedProduct,
    });
  }, [addProductHandler, editProductHandler, editedProduct]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchRestOfFormState({
        type: FORM_INPUT_CHANGES,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchRestOfFormState],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Ionicons
            name="md-checkmark"
            size={25}
            color={Colors.accentColor}
            onPress={() => {
              editedProduct ? editProductHandler() : addNewProduct();
              navigation.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Input
        id="title"
        label="Title"
        errorText="Please enter a valid title!"
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.title : ''}
        initiallyValid={!!editedProduct}
        required
      />

      <Input
        id="imageUrl"
        label="Image Url"
        errorText="Please enter a valid image imageUrl!"
        keyboardType="default"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.imageUrl : ''}
        initiallyValid={!!editedProduct}
        required
      />
      {editedProduct ? null : (
        <Input
          id="price"
          label="Price"
          errorText="Please enter a valid price!"
          keyboardType="decimal-pad"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          required
          min={0.1}
        />
      )}
      <Input
        id="description"
        label="Description"
        errorText="Please enter a valid description!"
        keyboardType="default"
        autoCapitalize="sentences"
        returnKeyType="next"
        autoCorrect
        numberOfLines={3}
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.description : ''}
        initiallyValid={!!editedProduct}
        required
        minLength={5}
      />
    </View>
  );
};

/* EditProductScreen.navigationOptions = (navData) => {
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
}; */

export default EditProductScreen;
