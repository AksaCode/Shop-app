import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../components/CardWrapper';
import HeaderButton from '../components/HeaderButton';
import RowButtons from '../components/RowButtons';
import LoadingComponent from '../components/LoadingComponent';
import { addProduct } from '../store/action/cart';
import * as productActions from '../store/action/product';
import EmptyOrder from '../components/EmptyOrder';
import Colors from '../constants/Colors';

const ProductsList = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const loadinOfProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [dispatch, setError, setLoading]);

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', loadinOfProducts);
    return () => {
      willFocus.remove();
    };
  }, [loadinOfProducts]);

  useEffect(() => {
    loadinOfProducts();
  }, [dispatch, loadinOfProducts]);

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
  if (error) {
    return (
      <EmptyOrder output="There is an error.">
        <Button title="reload" onPress={loadinOfProducts} color={Colors.accentColor} />
      </EmptyOrder>
    );
  }
  if (loading) {
    return <LoadingComponent />;
  }
  if (!loading && products.length === 0) {
    return <EmptyOrder output="There are no products." />;
  }
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
