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

export const deleteOrderFirebase = (order) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com/orders/${order.cartItems[0].ownerId}/${order.id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Response is not 200');
    }
    dispatch(deleteOrderDispatch(order));
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
    deleteOrderDispatch(state, action) {
      let newList = [];
      newList = state.orders.filter((item) => item.id !== action.payload.id);
      state.orders = [...newList];
    },
    deleteOrder(state, action) {
      let newItems = [];
      state.items.map((item, index) => {
        if (item.id === action.payload) {
          if (item.count === 1) {
            state.total = state.total - item.price;
            newItems = state.items.filter((item) => item.id !== action.payload);
          } else if (item.count > 1) {
            item.count = item.count - 1;
            state.total = state.total - item.price;
            newItems = [...state.items];
          }
        }
      });

      state.items = newItems.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      state.total = parseFloat(state.total.toFixed(2));
    },
  },
});

export const { fetchOrderReducer, addOrderReducer, deleteOrder, deleteOrderDispatch } = orderSlice.actions;

export default orderSlice.reducer;
