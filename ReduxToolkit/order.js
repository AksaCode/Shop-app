import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Order from '../model/order';

initialState = { orders: [] };

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (data, { getState }) => {
  const userId = getState().auth.userId;
  const response = await fetch(
    `https://shop-application-comtrade-default-rtdb.firebaseio.com//orders/zylavxBt6XR1D1Lj2vCsptTgKZh2.json`,
  );
  const resData = await response.json();
  fetchOrdersData = { ...resData, userId: userId };
  return fetchOrdersData;
});

export const addOrder = createAsyncThunk('orders/addOrder', async (data, { getState }) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  const date = new Date();
  const response = await fetch(
    `https://shop-application-comtrade-default-rtdb.firebaseio.com//orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: data.cart,
        totalAmount: data.total,
        date: date.toISOString(),
      }),
    },
  );
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const responseData = await response.json();
  const cartData = { id: responseData.name, cartItems: data.cart, total: data.total, date: date };
  return cartData;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  extraReducers: {
    [fetchOrders.pending]: (state, action) => {
      state.orders = [];
    },
    [fetchOrders.fulfilled]: (state, action) => {
      console.log(action.payload.userId);
      const loadedOrders = [];
      for (const key in action.payload) {
        loadedOrders.push(
          new Order(
            key,
            action.payload[key].cartItems,
            action.payload[key].totalAmount,
            new Date(action.payload[key].date),
          ),
        );
      }
      state.orders = [...loadedOrders];
    },
    [fetchOrders.rejected]: (state, action) => {
      state.orders = [];
    },
    [addOrder.fulfilled]: (state, action) => {
      const order = {
        id: action.payload.id,
        // cartItems: action.payload.cartItems,
        total: action.payload.totalAmount,
        // date: action.payload.date,
      };
      state.orders = [...state.orders, order];
    },
  },
});

export default orderSlice.reducer;
