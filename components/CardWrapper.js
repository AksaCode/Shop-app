import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import RowButtons from "./RowButtons";
import CardDetail from "./CardDetail";

const CardWrapper = ({ image, title, price, onViewDetail, onAddToCart }) => {
  return (
    <View style={styles.wrapp}>
      <Image source={{ uri: image }} style={{ width: "100%", height: 200 }} />
      <CardDetail title={title} price={price} />
      <RowButtons onViewDetail={onViewDetail} onAddToCart={onAddToCart} />
    </View>
  );
};

export default CardWrapper;

const styles = StyleSheet.create({
  wrapp: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    overflow: "hidden",
  },
});
