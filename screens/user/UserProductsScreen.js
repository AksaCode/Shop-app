import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../../components/CardWrapper';
import HeaderButton from '../../components/HeaderButton';

const renderUserProductsItem = (itemData) => (
  <CardWrapper
    image={itemData.item.imageUrl}
    title={itemData.item.title}
    price={itemData.item.price}
    onAddToCart={() => {}}
    onViewDetail={() => {}}
  />
);

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  return <FlatList data={userProducts} renderItem={renderUserProductsItem} numColumns={1} />;
};

UserProductsScreen.navigationOptions = (navData) => {
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
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
