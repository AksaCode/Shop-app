import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/Input';
import InputPass from '../../components/InputPass';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { login, signup } from '../../ReduxToolkit/auth';

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
const image = {
  uri: 'https://media.istockphoto.com/photos/smiling-deaf-african-girl-on-a-virtual-therapy-session-picture-id1284585951?k=20&m=1284585951&s=170667a&w=0&h=1RzXB10E6BpT4qUuAYOA8kG92s1QIoq1h2VP4_HhJR4=',
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
      action = signup(signState.inputValues);
    } else {
      action = login(signState.inputValues);
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
      <View style={styles.gradientStyle}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
                  <Button title={isSignUp ? 'Sign Up' : 'Login'} color={'#191970'} onPress={authHandler} />
                )}
              </View>
              <View style={styles.buttonStyle}>
                <Button
                  title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                  color={'#708090'}
                  onPress={() => {
                    setIsSignUp((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Computer Equipment Shop',
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
  },
  authContainerStyle: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 350,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //justifyContent: 'flex-end',
  },
  gradientStyle: {
    flex: 1,
    //justifyContent: 'flex-start',
    backgroundColor: '#b0c4de',
  },
  buttonStyle: {
    marginTop: 10,
  },
});
export default AuthScreen;
