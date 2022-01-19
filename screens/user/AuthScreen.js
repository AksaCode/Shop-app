import React, { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import { login, signup } from '../../ReduxToolkit/auth';
import Input from '../../components/Input';
import InputPass from '../../components/InputPass';

let Authshema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email address is incorrect!',
    ),
  password: yup.string().min(8, ({ min }) => `Password is incorect!`),
});

const image = {
  uri: 'https://media.istockphoto.com/photos/smiling-deaf-african-girl-on-a-virtual-therapy-session-picture-id1284585951?k=20&m=1284585951&s=170667a&w=0&h=1RzXB10E6BpT4qUuAYOA8kG92s1QIoq1h2VP4_HhJR4=',
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Ocurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async (values) => {
    let action;
    if (isSignUp) {
      action = signup(values);
    } else {
      action = login(values);
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50} style={styles.screenStyle}>
      <LinearGradient colors={['#ffff99', '#ffffcc']} style={styles.gradientStyle}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Card style={styles.authContainerStyle}>
            <ScrollView>
              <Formik
                validationSchema={Authshema}
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values) => {
                  authHandler(values);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                  <View>
                    <Input
                      id="email"
                      label="E-mail"
                      keyboardType="email-address"
                      required
                      email
                      autoCapitalize="none"
                      errorText="Please enter a valid email address."
                      initialValue=""
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />

                    {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <View>
                      <InputPass
                        id="password"
                        label="Password"
                        keyboardType="default"
                        required
                        minLength={8}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        initialValue=""
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                      {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>
                    <View style={styles.buttonStyle}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color={Colors.primaryColor} />
                      ) : (
                        <Button
                          title={isSignUp ? 'Sign Up' : 'Login'}
                          color={Colors.primaryColor}
                          onPress={handleSubmit}
                        />
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
                  </View>
                )}
              </Formik>
            </ScrollView>
          </Card>
        </ImageBackground>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
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
  },
  gradientStyle: {
    flex: 1,

    backgroundColor: '#b0c4de',
  },
  buttonStyle: {
    marginTop: 10,
  },
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    height: 50,
    marginHorizontal: 15,
  },
  iconEdit: {
    paddingRight: 10,
    position: 'relative',
  },
  errorText: {
    marginHorizontal: 15,
    color: 'red',
  },
});
export default AuthScreen;
