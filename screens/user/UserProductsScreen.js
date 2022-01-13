import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../../components/CardWrapper';
import HeaderButton from '../../components/HeaderButton';
import RowButtons from '../../components/RowButtons';
import EmptyOrder from '../../components/EmptyOrder';
import { deleteOnClick, getProducts } from '../../ReduxToolkit/products';

const UserProductsScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const deleteProduct = useCallback(async (productId) => {
    setIsRefreshing(true);
    try {
      await dispatch(deleteOnClick(productId));
    } catch {
      throw new Error(`delete didn't worked`);
    }
    setIsRefreshing(false);
  });
  const deleteAlert = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'default',
        onPress: () => {
          deleteProduct(id);
        },
      },
    ]);
  };

  const renderUserProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      cardAction={() => {
        props.navigation.navigate('Edit', {
          productId: itemData.item.id,
        });
      }}
    >
      <RowButtons
        rightAction={() => {
          deleteAlert(itemData.item.id);
        }}
        leftAction={() => {
          props.navigation.navigate('Edit', {
            productId: itemData.item.id,
          });
        }}
        leftTitle="edit"
        rightTitle="delete"
      />
    </CardWrapper>
  );
  if (userProducts.length === 0) {
    return <EmptyOrder output="This user has no products." />;
  }
  return (
    <FlatList
      onRefresh={deleteProduct}
      refreshing={isRefreshing}
      keyExtractor={(item, index) => index}
      data={userProducts}
      renderItem={renderUserProductsItem}
      numColumns={1}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'YOUR PRODUCTS',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create"
          iconName="md-create"
          onPress={() => {
            navData.navigation.navigate('Edit');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
