import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';

const EmptyOrder = (props) => {
  return (
    <View>
      <Text style={styles.mainStyle}>{props.output}</Text>
      <View>
        <Image
          style={{ width: 100, height: 100, marginHorizontal: 140, marginVertical: 40 }}
          source={{
            uri: 'https://www.kaphstore.com/resources/assets/front/images/cartempty.png',
          }}
        />
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '200',
    marginTop: 30,
    color: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentColor,
  },
  image: {
    marginTop: 15,
  },
});

export default EmptyOrder;
