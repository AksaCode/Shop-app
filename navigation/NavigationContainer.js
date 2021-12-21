import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ProductsNavigator from './ProductsNavigator';

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  useEffect(() => {
    setTimeout(() => {
      if (!isAuth) {
        navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
      }
    }, 3000);
  }, [isAuth]);
  return <ProductsNavigator ref={navRef} />;
};

export default NavigationContainer;
