import React, { useReducer, useCallback } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { signup } from '../../store/action/auth';

const FORM_SIGN = 'FORM_SIGN';

const signReducer = (state, action) => {
  if (action.type === FORM_SIGN) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [signState, dispatchSignState] = useReducer(signReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchSignState({
        type: FORM_SIGN,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchSignState],
  );
  const signupHandler = () => {
    dispatch(signup(signState.inputValues.email, signState.inputValues.password));
  };
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screenStyle}>
      <LinearGradient colors={['#ffff99', '#ffffcc']} style={styles.gradientStyle}>
        <Card style={styles.authContainerStyle}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Some error email text."
              onInputChange={signHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={8}
              autoCapitalize="none"
              errorText="Some error password text."
              onInputChange={signHandler}
              initialValue=""
            />
            <View style={styles.buttonStyle}>
              <Button title="Login" color={Colors.primaryColor} onPress={signupHandler} />
            </View>
            <View style={styles.buttonStyle}>
              <Button title="Sign Up" color={Colors.accentColor} onPress={() => {}} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'User Authentication',
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
  authContainerStyle: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradientStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
  },
});
export default AuthScreen;
