import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import LoadingComponent from '../../components/LoadingComponent';
import { addNewProduct, editProduct } from '../../ReduxToolkit/products';
import { Formik } from 'formik';
import * as yup from 'yup';

const addingProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, ({ min }) => `Title must be at least ${min} characters`)
    .required('Title should be added'),
  imageUrl: yup
    .string()
    .min(10, ({ min }) => `Image url must be at least ${min} characters`)
    .required('Image url is needed for showing the product picture'),
  price: yup
    .number()
    .min(1, ({ min }) => `Price must be at least ${min} characters`)
    .required('Give us the price of your product'),
  description: yup
    .string()
    .min(10, ({ min }) => `Description must be at least ${min} characters`)
    .required('Tell us about your product'),
});

const editingProductSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, ({ min }) => `Title must be at least ${min} characters`)
    .required('Title should be added'),
  imageUrl: yup
    .string()
    .min(10, ({ min }) => `Image url must be at least ${min} characters`)
    .required('Image url is needed for showing the product picture'),
  description: yup
    .string()
    .min(10, ({ min }) => `Description must be at least ${min} characters`)
    .required('Tell us about your product'),
});

const EditProductScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const productId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === productId));
  const dispatch = useDispatch();

  const addProductHandler = useCallback(
    async (values) => {
      setError(null);
      setLoading(true);
      try {
        await dispatch(addNewProduct(values));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [dispatch, setError, setLoading],
  );

  const editProductHandler = useCallback(
    async (values) => {
      const editParams = [productId, values];
      setError(null);
      setLoading(true);
      try {
        await dispatch(editProduct(editParams));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [dispatch, productId],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View removeClippedSubviews={false}>
      <ScrollView>
        <Formik
          validationSchema={editedProduct ? editingProductSchema : addingProductSchema}
          initialValues={{
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: 0,
            description: editedProduct ? editedProduct.description : '',
          }}
          onSubmit={(values) => {
            if (!editedProduct) {
              addProductHandler(values);
              props.navigation.goBack();
              props.navigation.navigate('Products', {
                refresh: true,
              });
            } else {
              editProductHandler(values);
              props.navigation.goBack();
              props.navigation.navigate('Products', {
                refresh: true,
              });
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <>
              <Text style={styles.label}>Title</Text>

              <TextInput
                name="title"
                style={styles.input}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                keyboardType="default"
              />
              {errors.title && touched.title && <Text style={styles.errorText}>{errors.title}</Text>}
              <Text style={styles.label}>Image url</Text>

              <TextInput
                name="imageUrl"
                style={styles.input}
                onChangeText={handleChange('imageUrl')}
                onBlur={handleBlur('imageUrl')}
                value={values.imageUrl}
                keyboardType="default"
              />
              {errors.imageUrl && touched.imageUrl && <Text style={styles.errorText}>{errors.imageUrl}</Text>}
              {editedProduct ? null : <Text style={styles.label}>Price</Text>}
              {editedProduct ? null : (
                <TextInput
                  name="price"
                  style={styles.input}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  keyboardType="number-pad"
                />
              )}
              {errors.price && touched.price && <Text style={styles.errorText}>{errors.price}</Text>}
              <Text style={styles.label}>Description</Text>

              <TextInput
                name="description"
                style={styles.input}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                keyboardType="default"
              />
              {errors.description && touched.description && <Text style={styles.errorText}>{errors.description}</Text>}
              <View style={styles.buttonContainer}>
                <View style={styles.buttonCancel}>
                  <Item
                    onPress={() => {
                      props.navigation.goBack();
                    }}
                    title="Checkout"
                    iconName="chevron-back"
                    IconComponent={Ionicons}
                    iconSize={23}
                    color={Colors.primaryColor}
                  />
                </View>
                <View style={styles.buttonAccept}>
                  <Item
                    onPress={handleSubmit}
                    title="Checkout"
                    iconName="md-checkmark"
                    IconComponent={Ionicons}
                    iconSize={23}
                    color={Colors.backgroundDefaultColor}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export const screenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};

  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginHorizontal: 15,
    marginTop: 5,
  },
  listParam: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    height: 35,
    marginHorizontal: 15,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginTop: 15,
    color: Colors.accentColor,
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonAccept: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 0,
    borderColor: Colors.accentColor,
    borderRadius: 10,
    backgroundColor: Colors.accentColor,
    marginLeft: 20,
  },
  buttonCancel: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: Colors.primaryColorColor,
    borderRadius: 10,
  },
});

export default EditProductScreen;
