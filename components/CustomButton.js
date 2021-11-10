import React from 'react';
import { StyleSheet, Button } from 'react-native';

import Colors from '../constants/Colors';

const CustomButton = ({ title, action }) => {
  return <Button title={title} onPress={action} color={Colors.accentColor} />;
};

export default CustomButton;

const styles = StyleSheet.create({});
