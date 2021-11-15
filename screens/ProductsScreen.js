import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { addProduct } from '../store/action/cart';
import CardWrapper from '../components/CardWrapper';
import HeaderButton from '../components/HeaderButton';
import RowButtons from '../components/RowButtons';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const renderProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      cardAction={() => {
        props.navigation.navigate({
          routeName: 'Details',
          params: {
            productId: itemData.item.id,
          },
        });
      }}
    >
      <RowButtons
        rightAction={() => onAddToCart(itemData.item)}
        leftAction={() => {
          props.navigation.navigate({
            routeName: 'Details',
            params: {
              productId: itemData.item.id,
            },
          });
        }}
        leftTitle="details"
        rightTitle="cart"
      />
    </CardWrapper>
  );

  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

ProductsList.navigationOptions = (navData) => {
  return {
    headerTitle: 'Products',
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
          title="Cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate({ routeName: 'Cart' });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsList;
