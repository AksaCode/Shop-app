import Order from '../../model/order';

export const CREATOR = 'CREATOR';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/orders/u1.json');
      if (!response.ok) {
        throw new Error('Response is not 200');
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)),
        );

        dispatch({ type: SET_ORDERS, orders: loadedOrders });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/orders/u1.json${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const responseData = await response.json();
    dispatch({
      type: CREATOR,
      id: responseData.name,
      totalAmount: totalAmount,
      cartItems: cartItems,
      date: date,
    });
  };
};
