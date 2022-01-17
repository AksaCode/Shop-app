import { createSlice } from '@reduxjs/toolkit';

initialState = { orders: [] };

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const date = new Date().toISOString();
    try {
      const response = await fetch(
        `https://shop-application-comtrade-default-rtdb.firebaseio.com/orders/${userId}.json`,
      );
      if (!response.ok) {
        throw new Error('Response is not 200');
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push({
          id: key,
          cartItems: resData[key].cartItems,
          totalAmount: resData[key].totalAmount,
          date: resData[key].date,
        });
      }
      const objectOrders = {
        orders: loadedOrders,
      };
      dispatch(fetchOrderReducer(objectOrders));
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date().toISOString();
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: data.cartItems,
          totalAmount: data.totalAmount,
          date: date,
        }),
      },
    );
    const responseData = await response.json();
    const id = responseData.name;
    const cartData = { id, ...data, date: date };
    dispatch(addOrderReducer(cartData));
  };
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    fetchOrderReducer(state, action) {
      state.orders = action.payload.orders;
    },
    addOrderReducer(state, action) {
      const order = {
        id: action.payload.id,
        cartItems: action.payload.cartItems,
        totalAmount: action.payload.totalAmount,
        date: action.payload.date,
      };
      state.orders = [...state.orders, order];
    },
  },
});

export const { fetchOrderReducer, addOrderReducer } = orderSlice.actions;

export default orderSlice.reducer;
