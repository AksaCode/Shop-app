import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { PRODUCTS } from "../data/dummy-data";

const ProductsList = (props) => {
  const renderProductsItem = (itemData) => {
    return (
      <View>
        <Text>{title = itemData.item.title}</Text>
      </View>
    );
  };
  return (
    <FlatList data={PRODUCTS} renderItem={renderProductsItem} numColumns={1} />
  );
};

export default ProductsList;

