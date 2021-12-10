import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import InputPass from '../../components/InputPass';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/action/auth';

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
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Ocurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signup(signState.inputValues.email, signState.inputValues.password);
    } else {
      action = authActions.login(signState.inputValues.email, signState.inputValues.password);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50} style={styles.screenStyle}>
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
              errorText="Please enter a valid email address."
              onInputChange={signHandler}
              initialValue=""
            />
            <View>
              <InputPass
                id="password"
                label="Password"
                keyboardType="default"
                required
                minLength={8}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={signHandler}
                initialValue=""
              />
            </View>
            <View style={styles.buttonStyle}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button title={isSignUp ? 'Sign Up' : 'Login'} color={Colors.primaryColor} onPress={authHandler} />
              )}
            </View>
            <View style={styles.buttonStyle}>
              <Button
                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
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
