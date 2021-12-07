import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/Input';
import CardWrapper from '../../components/CardWrapper';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screenStyle}>
      <LinearGradient colors={['#ffff99','#ffffcc']}>
      <CardWrapper style={styles.authContainerStyle} style={styles.gradientStyle}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Some error email text."
            onInputChange={() => {}}
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
            onInputChange={() => {}}
            initialValue=""
          />
          <View style={styles.buttonStyle}><Button title="Login" color={Colors.primaryColor} onPress={() => {}} /></View>
          <View style={styles.buttonStyle}><Button title="Sign Up" color={Colors.accentColor} onPress={() => {}} /></View>
        </ScrollView>
      </CardWrapper>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
    headerTitle: 'User Authentication'
}; 

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
    },
    authContainerStyle: {
        width= '80%',
        maxWidth: 400,
        maxHeight:400,
        padding: 20
    },
    gradientStyle:{
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    buttonStyle:{
        marginTop: 10
    }
});
export default AuthScreen;
