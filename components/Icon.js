import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import Colors from '../constants/Colors';

const Icon = (props) => {
  return (
    <View>
      <Ionicons
        name="md-checkmark"
        size={25}
        color={Colors.accentColor}
        onPress={() => {
          editedProduct ? editSelectedProduct() : addNewProduct();
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

export default Icon;
