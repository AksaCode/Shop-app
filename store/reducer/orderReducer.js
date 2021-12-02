import { CREATOR, SET_ORDERS } from '../action/order';
import Order from '../../model/order';

const initState = { orders: [] };

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case CREATOR:
      const order = new Order(action.id, action.cartItems, action.totalAmount, action.date);
      return { orders: [...state.orders, order] };
  }
  return state;
};
export default orderReducer;
