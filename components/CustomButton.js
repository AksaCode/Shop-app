import React from "react";
import { StyleSheet, View, Button } from "react-native";

const CustomButton = ({ title, action }) => {
  return <Button title={title} onPress={action} color="red" />;
};

export default CustomButton;

const styles = StyleSheet.create({});
