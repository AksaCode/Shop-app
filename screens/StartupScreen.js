import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

import Colors from '../constants/Colors';
import { authenticate, verifyAuth, setDidTry } from '../ReduxToolkit/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const userInfoo = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(setDidTry());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(setDidTry());

        return;
      }
      const runOutTime = expirationDate.getTime() - new Date().getTime();
      // props.navigation.navigate('Shop');
      dispatch(setDidTry());
      dispatch(authenticate(userId, token, runOutTime));
      dispatch(verifyAuth(userId, token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screenStyle}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StartupScreen;
