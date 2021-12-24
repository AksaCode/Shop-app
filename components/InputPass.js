import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputPass = (props) => {
  _changeIcon = () => {
    icon !== 'ios-eye-off' ? (setIcon('ios-eye-off'), setHidePassword(false)) : (setIcon('eye'), setHidePassword(true));
  };

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.passV}>
        <Ionicons
          name={icon}
          size={23}
          onPress={() => {
            _changeIcon();
            require;
          }}
          style={styles.iconEdit}
          color="black"
        />
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          secureTextEntry={hidePassword}
        />
      </View>
      {!inputState.isValid ? <Text></Text> : <Text style={{ marginHorizontal: 15 }}>{props.errorText}</Text>}
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
    color: 'black',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 15,
  },
  passV: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconEdit: {
    paddingRight: 10,
    position: 'absolute',
  },
});

export default InputPass;
