import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    height: 35,
    marginHorizontal: 15,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 15,
  },
});

export default Input;
