import { ADD_PRODUCT } from '../action/cart';

const initState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  if (action.type === ADD_PRODUCT) {
    const newItems = [...state.items, action.product];
    const totalCost = state.total + action.product.price;
    console.log('action price', action.product.price);
    return { items: newItems, total: totalCost };
  } else return state;
};

export default cartReducer;
