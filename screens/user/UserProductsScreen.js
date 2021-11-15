import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../../components/CardWrapper';
import HeaderButton from '../../components/HeaderButton';
import RowButtons from '../../components/RowButtons';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const renderUserProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      cardAction={() => {}}
    >
      <RowButtons
        rightAction={() => {}}
        leftAction={() => {
          props.navigation.navigate({
            routeName: 'Edit',
            params: {
              productId: itemData.item.id,
            },
          });
        }}
        leftTitle="edit"
        rightTitle="delete"
      />
    </CardWrapper>
  );

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
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
