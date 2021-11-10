import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

import OrderItem from "./OrderItem";

const OrderList = (props) => {
    const orders = useSelector((state) => state.orders.orders);
    const renderOrder = (itemData) => <OrderItem productPrice={itemData.item.totalAmount} date={moment(itemData.item.date).format("MMMM Do YYYY, h:mm")} />

    return <FlatList data={orders} renderItem={renderOrder} numColumn={1} />;
};

export default OrderList;