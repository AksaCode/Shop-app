import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const DetailsProductScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Details</Text>
    </View>
  );
};

export default DetailsProductScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
