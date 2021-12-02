import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

//import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../../components/CardWrapper';
import HeaderButton from '../../components/HeaderButton';
import RowButtons from '../../components/RowButtons';
import { deleteOnClick } from '../../store/action/product';

const UserProductsScreen = ({ navigation }) => {
  const [prodId, setProdId] = useState();
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const deleteProduct = (productId) => {
    dispatch(deleteOnClick(productId));
  };

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
        rops.navigation.navigate('Edit', {
          productId: itemData.item.id,
        });
      }}
    >
      <RowButtons
        rightAction={() => {
          deleteAlert(itemData.item.id);
        }}
        leftAction={() => {
          navigation.navigate('Edit', {
            productId: itemData.item.id,
          });
        }}
        leftTitle="edit"
        rightTitle="delete"
      />
    </CardWrapper>
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Ionicons
            name="md-create"
            size={25}
            color="green"
            onPress={() => {
              navigation.navigate('Edit', {
                productId: -1,
              });
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return <FlatList data={userProducts} renderItem={renderUserProductsItem} numColumns={1} />;
};

/* UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your products',
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
            navData.navigation.navigate({ routeName: 'Edit' });
          }}
        />
      </HeaderButtons>
    ),
  };
}; */

const styles = StyleSheet.create({});

export default UserProductsScreen;
