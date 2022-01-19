import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputPass = (props) => {
  const [icon, setIcon] = useState('eye-off');
  const [hidePassword, setHidePassword] = useState(true);
  _changeIcon = () => {
    icon !== 'eye-off' ? (setIcon('eye-off'), setHidePassword(true)) : (setIcon('eye'), setHidePassword(false));
  };

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.passV}>
        <TextInput {...props} style={styles.input} secureTextEntry={hidePassword}/>
        <Ionicons
          name={icon}
          size={23}
          onPress={() => {
            _changeIcon();
            
          }}
          style={styles.iconEdit}
          color="black"
        />
      </View>
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
    paddingRight: 15,
    position: 'absolute',
    
  },
});

export default InputPass;
