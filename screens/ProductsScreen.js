import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../components/CardWrapper';
import { addProduct } from '../store/action/cart';
import DetailsProductScreen from './DetailsProductScreen';
import HeaderButton from '../components/HeaderButton';

const ProductsList = (props) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const renderProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      onAddToCart={() => onAddToCart(itemData.item)}
      onViewDetail={() => {
        props.navigation.navigate({
          routeName: 'Details',
          params: {
            productId: itemData.item.id,
          },
        });
      }}
    />
  );

  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  return <FlatList data={products} renderItem={renderProductsItem} numColumns={1} />;
};

ProductsList.navigationOptions = (navData) => {
  return {
    headerTitle: 'Products',
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
