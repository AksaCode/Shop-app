import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from './CustomButton';

const RowButtons = ({ leftAction, rightAction, leftTitle, rightTitle }) => {
  return (
    <View style={styles.content}>
      <CustomButton title={leftTitle} action={leftAction} />
      <CustomButton title={rightTitle} action={rightAction} />
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
