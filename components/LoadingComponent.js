import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors';

const LoadingComponent = (props) => {
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size="large" color={Colors.accentColor}></ActivityIndicator>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({ indicator: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
