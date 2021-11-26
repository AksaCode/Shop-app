import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomHeaderButton = (props) => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Colors.accentColor} />;
};

export default CustomHeaderButton;
