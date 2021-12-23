import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color } from 'react-native-reanimated';
import Colors from '../constants/Colors';

import CustomButton from './CustomButton';

const RowButtons = ({ leftAction, rightAction, leftTitle, rightTitle }) => {
  return (
    <View style={styles.content}>
      <CustomButton title={leftTitle} action={leftAction} color={Colors.accentColor} />
      <CustomButton title={rightTitle} action={rightAction} color={Colors.primaryColor} />
    </View>
  );
};

export default RowButtons;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  },
});
