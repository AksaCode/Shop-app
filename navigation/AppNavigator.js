import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { MainNavigator, AuthNavigator } from './ProductsNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isTried = useSelector((state) => !!state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && isTried && <AuthNavigator />}
      {!isAuth && !isTried && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
