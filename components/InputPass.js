import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputPass = (props) => {
  const [icon, setIcon] = useState('ios-eye-off');
  const [hidePassword, setHidePassword] = useState(true);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  _changeIcon = () => {
    icon !== 'ios-eye-off' ? (setIcon('ios-eye-off'), setHidePassword(false)) : (setIcon('eye'), setHidePassword(true));
  };

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.passV}>
        <TextInput
          {...props}
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          secureTextEntry={hidePassword}
        />
        <Ionicons
          name={icon}
          size={23}
          onPress={() => _changeIcon()}
          style={{ textAlign: 'right', width: '15%' }}
          color="black"
        />
      </View>
      {!inputState.isValid && <Text style={{ marginHorizontal: 15 }}>{props.errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '65%',
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
  passV: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default InputPass;
