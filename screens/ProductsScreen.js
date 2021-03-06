import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CardWrapper from '../components/CardWrapper';
import HeaderButton from '../components/HeaderButton';
import RowButtons from '../components/RowButtons';
import LoadingComponent from '../components/LoadingComponent';
import { fetchProducts } from '../store/action/product';
import EmptyOrder from '../components/EmptyOrder';
import Colors from '../constants/Colors';
import { getProducts } from '../ReduxToolkit/products';
import { addProduct } from '../ReduxToolkit/cartReducer';

const ProductsList = (props) => {
  const refresh = props.route.params ? props.route.params.refresh : null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const loadingOfProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(getProducts());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setError, setLoading, setIsRefreshing]);

  useEffect(() => {
    const unsub = props.navigation.addListener('focus', loadingOfProducts);
    return () => {
      unsub();
    };
  }, [loadingOfProducts]);

  useEffect(() => {
    if (refresh) {
      setIsRefreshing(true);
    }
    loadingOfProducts().then(() => {
      setLoading(false);
      setIsRefreshing(false);
    });
  }, [dispatch, loadingOfProducts, setLoading]);

  const renderProductsItem = (itemData) => (
    <CardWrapper
      image={itemData.item.imageUrl}
      title={itemData.item.title}
      price={itemData.item.price}
      cardAction={() => {
        props.navigation.navigate('Details', { productId: itemData.item.id });
      }}
    >
      <RowButtons
        rightAction={() => onAddToCart(itemData.item)}
        leftAction={() => {
          props.navigation.navigate('Details', { productId: itemData.item.id });
        }}
        leftTitle="details"
        rightTitle="cart"
      />
    </CardWrapper>
  );

  const onAddToCart = useCallback(
    async (product) => {
      await dispatch(addProduct(product));
    },
    [dispatch],
  );
  if (error) {
    return (
      <EmptyOrder output="There is an error.">
        <Button title="reload" onPress={loadingOfProducts} color={Colors.accentColor} />
      </EmptyOrder>
    );
  }
  if (loading) {
    return <LoadingComponent />;
  }
  if (!loading && products.length === 0) {
    return <EmptyOrder output="There are no products." />;
  }
  return (
    <FlatList
      onRefresh={loadingOfProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item, index) => index}
      renderItem={renderProductsItem}
      numColumns={1}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'PRODUCTS',
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
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsList;
