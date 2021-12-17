import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';

import Colors from '../constants/Colors';
// import * as authActions from '../store/action/auth';
import { authenticate } from '../ReduxToolkit/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const experationDate = new Date(expiryDate);
      if (experationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      const runOutTime = experationDate.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      const pom = { userId: userId, token: token, expireTime: runOutTime };
      dispatch(authenticate(pom));
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
