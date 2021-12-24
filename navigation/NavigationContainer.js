import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ProductsNavigator from './ProductsNavigator';

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  const authRef = useRef(true);
  console.log(isAuth);
  useEffect(() => {
    if (!authRef.current) {
      authRef.current = !isAuth;
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
    }
  }, [isAuth]);
  return <ProductsNavigator ref={navRef} />;
};

export default NavigationContainer;
