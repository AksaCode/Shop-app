import { CREATOR } from '../action/order';
import Order from '../../model/order';

const initState = { orders: [] };

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATOR:
      if (action.type === CREATOR) {
        const order = new Order(Math.random(), action.cartItems, action.totalAmount, new Date());
        return { ...state, orders: [...state.orders, order] };
      }
  }
  return state;
};
export default orderReducer;
